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

/*
 * Walk a component tree and recursively render it.
 */
class ReactFromJSON<
  MappingType = object,
  ComponentsType = object
> extends React.Component<ReactFromJSONProps<MappingType, ComponentsType>> {
  public counter = {};

  resolveProp = (prop: any): any => {
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

        return this.componentLookup(componentRef);

        // Handle nested components
      } else if (
        // Typeguard
        prop["type"] !== undefined &&
        prop["props"] !== undefined
      ) {
        const component: Component = prop;

        return this.renderComponent(component);
      }
    }

    return prop;
  };

  componentLookup = (componentRef: ComponentRef) => {
    const { components } = this.props;
    const { componentIndex, componentType } = componentRef;

    if (!components) {
      throw "Detected `ComponentRef` prop on a component, but `components` is undefined. You need to define `components` if using `ComponentRef` props.";
    }

    const component = components[componentType][componentIndex];

    return this.renderComponent(component);
  };

  getNextKey(type: string) {
    this.counter[type] = this.counter[type] || 0;
    return `${type}_${this.counter[type]++}`;
  }

  renderComponent(component: Component) {
    const { mapping } = this.props;
    const { type, props } = component;
    const resolvedProps = {};
    const key = this.getNextKey(type);

    const propKeys = Object.keys(props);

    for (let index = 0; index < propKeys.length; index++) {
      const propKey = propKeys[index];
      const prop = props[propKey];

      resolvedProps[propKey] = this.resolveProp(prop);
    }

    const MappedComponent = mapping[type];

    if (typeof MappedComponent === "undefined") {
      throw `Tried to render the "${type}" component, but it's not specified in your mapping.`;
    }

    return <MappedComponent key={key} {...resolvedProps} />;
  }

  render() {
    const { entry } = this.props;

    return <>{this.renderComponent(entry)}</>;
  }
}

export default ReactFromJSON;
