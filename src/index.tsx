import * as React from "react";

export interface Component {
  type: string;
  props: object;
}

export interface ComponentRef {
  componentType: string;
  componentIndex: number;
}

export interface ReactFromJSONProps<MappingType, ComponentsType> {
  components?: ComponentsType;
  entry: Component;
  mapping: MappingType;
}

interface DefaultComponentsType {}

/*
* Walk component tree and recursively render, starting at a given ComponentRef
* 
* Loosely typed so we don't need to update chameleon for every component. It
* should be safe to do since everything else typed up to this point.
*/
class ReactFromJSON<
  MappingType,
  ComponentsType = DefaultComponentsType
> extends React.Component<ReactFromJSONProps<MappingType, ComponentsType>> {
  resolveProp = (prop: any, index?: number): any => {
    if (Array.isArray(prop)) {
      return prop.map(this.resolveProp);
    } else if (typeof prop === "object") {
      // Handle componentRef
      if (
        // Typeguard
        prop["componentType"] !== undefined &&
        prop["componentIndex"] !== undefined
      ) {
        const componentRef: ComponentRef = prop;

        return this.componentLookup(componentRef, index);

        // Handle nested components
      } else if (
        // Typeguard
        prop["type"] !== undefined &&
        prop["props"] !== undefined
      ) {
        const component: Component = prop;

        return this.renderComponent(component, index);
      }
    }

    return prop;
  };

  componentLookup = (componentRef: ComponentRef, index = 0) => {
    const { components } = this.props;
    const { componentIndex, componentType } = componentRef;

    if (!components) {
      throw "Detected `ComponentRef` prop on a component, but `components` is undefined. You need to define `components` if using `ComponentRef` props.";
    }

    const component = components[componentType][componentIndex];

    return this.renderComponent(component, index);
  };

  renderComponent(component: Component, index = 0) {
    const { mapping } = this.props;

    const { type, props } = component;
    const resolvedProps = {};

    const key = `${type}_${index}`;

    for (const propKey of Object.keys(props)) {
      const prop = props[propKey];
      resolvedProps[propKey] = this.resolveProp(prop);
    }

    const MappedComponent = mapping[type];

    return <MappedComponent key={key} {...resolvedProps} />;
  }

  render() {
    const { entry } = this.props;

    return <>{this.renderComponent(entry)}</>;
  }
}

export default ReactFromJSON;
