import * as React from "react";

export interface Component {
  type: string;
  props: object;
}

interface ComponentLookupProps {
  componentType: string;
  componentIndex: number;
  propIndex?: number;
}

export interface ComponentLookup {
  props: ComponentLookupProps;
}

export interface WithDefault {
  default?: any
}

export interface ReactFromJSONProps<
  MappingType = object,
  ComponentsType = object
> {
  components?: ComponentsType;
  entry: Component | any;
  mapProp?: (obj: any) => any;
  mapping: MappingType & WithDefault;
}

/*
 * Walk a component tree and recursively render it.
 */
class ReactFromJSON<
  MappingType = object,
  ComponentsType = object
> extends React.Component<ReactFromJSONProps<MappingType, ComponentsType>> {
  public counter = {};

  public internalMapping: object = {};

  constructor(props: any) {
    super(props);

    this.internalMapping = {
      ComponentLookup: this.ComponentLookup
    };
  }

  ComponentLookup = ({
    componentIndex,
    componentType,
    propIndex
  }: ComponentLookupProps) => {
    const { components } = this.props;

    if (!components) {
      throw "Detected `ComponentLookup` prop on a component, but `components` is undefined. You need to define `components` if using `ComponentLookup` props.";
    }

    if (!components[componentType]) {
      throw `Detected \`${componentType}\` ComponentLookup, but it's not defined in your \`components\` object.`;
    }

    const component = components[componentType][componentIndex];

    return this.renderComponent({
      ...component,
      props: {
        id: component.id || componentIndex, // Map id to component props if specified on root. Otherwise, use index.
        propIndex: propIndex,
        ...component.props
      }
    });
  };

  resolveProp = (prop: any, index?: number): any => {
    const { mapProp = (p: any) => p } = this.props;
    const mappedProp = mapProp(prop);

    if (mappedProp === null) {
      return mappedProp;
    } else if (Array.isArray(mappedProp)) {
      return mappedProp.map(this.resolveProp);
    } else if (typeof mappedProp === "object") {
      if (
        // Typeguard
        mappedProp["type"] !== undefined &&
        mappedProp["props"] !== undefined
      ) {
        const component: Component = mappedProp;

        return this.renderComponent(component, index);
      }
    }

    return mappedProp;
  };

  getNextKey(type: string, propIndex?: number) {
    this.counter[type] = this.counter[type] || 0;
    const propIndexKey =
      typeof propIndex !== "undefined" ? `_${propIndex}` : "";
    return `${type}_${this.counter[type]++}${propIndexKey}`;
  }

  renderComponent(component: Component | any, propIndex?: number) {
    const { mapping } = this.props;
    const { type, props } = component;
    const resolvedProps = {};
    const key = this.getNextKey(type, propIndex);

    const propKeys = Object.keys(props);

    for (let index = 0; index < propKeys.length; index++) {
      const propKey = propKeys[index];
      const prop = props[propKey];

      resolvedProps[propKey] = this.resolveProp(prop);
    }

    const MappedComponent = this.internalMapping[type] || mapping[type] || mapping.default;

    if (typeof MappedComponent === "undefined") {
      throw `Tried to render the "${type}" component, but it's not specified in your mapping.`;
    }

    return (
      <MappedComponent key={key} propIndex={propIndex} _type={type} {...resolvedProps} />
    );
  }

  render() {
    const { entry } = this.props;

    return <>{this.resolveProp(entry)}</>;
  }
}

export default ReactFromJSON;
