# react-from-json

> Declare your React component tree in JSON

[![NPM](https://img.shields.io/npm/v/react-from-json.svg)](https://www.npmjs.com/package/react-from-json) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

`react-from-json` lets you render React

```jsx
<Foo>
  <Bar baz="Hello, world" />
</Foo>
```

from JSON

```json
{
  "type": "Foo",
  "props": {
    "children": {
      "type": "Bar",
      "props": {
        "baz": "Hello, world"
      }
    }
  }
}
```

It also supports non-recursive structures.

## Install

```bash
npm install --save react-from-json
```

## Usage

```jsx
import React from "react";
import ReactFromJSON from "react-from-json";

const entry = {
  type: "Foo",
  props: {
    children: {
      type: "Bar",
      props: {
        baz: "Hello, world",
      },
    },
  },
};

const mapping = {
  Foo: ({ children }) => (
    <div>
      <div>{children}</div>
    </div>
  ),
  Bar: ({ baz }) => <span>{baz}</span>,
};

const Example = () => {
  return <ReactFromJSON entry={entry} mapping={mapping} />;
};
```

### Props passed to your components

Props passed to your mapped components include

- `propKey` - name of the prop that rendered your component
- `propIndex` - index of your component if using [flat trees](#flat-trees)
- `_type` - the `type` value for your component
- `...props` - the resolved value of your `props` object, with relevant child nodes rendered as components

### Other JSON shapes

If your data doesn't follow the `type` | `props` shape, `react-from-json` makes it easy to map your data on the fly using the `mapProp` prop.

```jsx
import React from "react";
import ReactFromJSON from "react-from-json";
import mapping from "./mapping";

const entryWithDifferentShape = {
  _type: "Foo",
  children: {
    _type: "Bar",
    baz: "Hello, world",
  },
};

const mapProp = (prop) => {
  if (prop._type) {
    const { _type, ...props } = prop;

    return {
      type: _type,
      props,
    };
  }

  return prop;
};

const Example = () => {
  return (
    <ReactFromJSON
      entry={entryWithDifferentShape}
      mapping={mapping}
      mapProp={mapProp}
    />
  );
};
```

### Flat trees

`react-from-json` also supports flat, non-recursive structures via the special `<ComponentLookup />` component. This is useful when working with typed systems like GraphQL, and you need to avoid unions.

#### The `<ComponentLookup />` component

`<ComponentLookup />` simply maps to another component defined in a `components` object. If you were using it in React, you would use it like:

```jsx
<ComponentLookup componentType="Button" componentIndex={0} />
```

which would look up the `Button` component at index `0` in the `components` object, resolving to:

```jsx
<Button id={0}>Hello, World!</Button>
```

For `react-from-json` we use JSON, so we would write this:

```json
{
  "type": "ComponentLookup",
  "props": {
    "componentType": "Button",
    "componentIndex": 0
  }
}
```

> The `id` here is set by the `componentIndex`, since we didn't specify one in the JSON. See <a href="#a-note-on-ids">this comment on IDs</a> for more information.

#### Example

Here's the same example as above, instead using a `<ComponentLookup />` for `entry.props.baz`, and providing a separate `components` object.

```jsx
import React from "react";
import ReactFromJSON from "react-from-json";

const entry = {
  type: "Foo",
  props: {
    baz: {
      type: "ComponentLookup",
      props: {
        componentIndex: 0,
        componentType: "Bar",
      },
    },
  },
};

const mapping = {
  Foo: ({ baz }) => (
    <div>
      <div>{baz}</div>
    </div>
  ),
  Bar: ({ baz }) => <span>{baz}</span>,
};

const components = {
  Bar: [
    {
      type: "Bar",
      props: {
        baz: "Hello, world",
      },
    },
  ],
};

const Example = () => {
  return (
    <ReactFromJSON entry={entry} mapping={mapping} components={components} />
  );
};
```

### A note on ids

`react-from-json` will map `id` from the root of your component JSON to the React component's `id` prop. Likewise, if you specify `id` under `props`, it will use this. If you use the `<ComponentLookup />` component, `react-from-json` will use the array index as `id` unless another `id` is specified. **Your `id` will always take priority.**

### With TypeScript

`react-from-json` supports generic types for use with TypeScript.

```tsx
import { entry, mapping, components } from "./aboveExample";
import ReactFromJSON from "react-from-json";

interface Components {
  Bar: object[];
}

interface Mapping {
  Foo: React.ReactNode;
  Bar: React.ReactNode;
}

class FooReactFromJSON extends ReactFromJSON<Mapping, Components> {
  render(): JSX.Element {
    return super.render();
  }
}

const Example = () => {
  return (
    <FooReactFromJSON entry={entry} mapping={mapping} components={components} />
  );
};
```

## License

MIT © [Measured Corporation Ltd](https://github.com/measuredco)
