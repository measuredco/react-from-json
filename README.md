# react-from-json

> Declare your React component tree in JSON

[![NPM](https://img.shields.io/npm/v/react-from-json.svg)](https://www.npmjs.com/package/react-from-json) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Example](http://hydrateio.github.io/react-from-json/)

## Intro

`react-from-json` lets you render React

```jsx
<Burger chain="Wahlburger">
  <Patty variant="impossible" />
</Burger>
```

from JSON

```json
{
  "type": "Burger",
  "props": {
    "chain": "Wahlburger",
    "children": {
      "type": "Patty",
      "props": {
        "variant": "impossible"
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
  type: "Burger",
  props: {
    chain: "Wahlburger",
    children: {
      type: "Patty",
      props: {
        variant: "Impossible"
      }
    }
  }
};

const mapping = {
  Burger: ({ chain, children }) => (
    <div>
      <h1>{chain}</h1>
      <div>{children}</div>
    </div>
  ),
  Patty: ({ variant }) => <span>{variant}</span>
};

const Example = () => {
  return <ReactFromJSON entry={entry} mapping={mapping} />;
};
```

### Flat trees

`react-from-json` also supports flat, non-recursive structures via the special `<ComponentLookup />` component. This is useful when working with typed systems like GraphQL, and you need to avoid unions.

The `<ComponentLookup />` simply maps to another component defined in a `components` object. If you were using it in React, you would use it like:

```jsx
<ComponentLookup componentType="Button" componentIndex={0} />
```

which would look up the `Button` component at index `0` in the `components` object, resolving to:

```jsx
<Button>Hello, World!</Button>
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

#### Example

Here's the same example as above, instead using a `<ComponentLookup />` for `entry.props.patty`, and providing a separate `components` object.

```jsx
import React from "react";
import ReactFromJSON from "react-from-json";

const entry = {
  type: "Burger",
  props: {
    chain: "Wahlburger",
    patty: {
      type: "ComponentLookup",
      props: {
        componentIndex: 0,
        componentType: "Patty"
      }
    }
  }
};

const mapping = {
  Burger: ({ chain, patty }) => (
    <div>
      <h1>{chain}</h1>
      <div>{patty}</div>
    </div>
  ),
  Patty: ({ variant }) => <span>{variant}</span>
};

const components = {
  Patty: [
    {
      type: "Patty",
      props: {
        variant: "Impossible"
      }
    }
  ]
};

const Example = () => {
  return (
    <ReactFromJSON entry={entry} mapping={mapping} components={components} />
  );
};
```

## With TypeScript

`react-from-json` supports generic types for use with TypeScript.

```tsx
import { entry, mapping, components } from "./aboveExample";
import ReactFromJSON from "react-from-json";

interface Components {
  Patty: object[];
}

interface Mapping {
  Burger: React.ReactNode;
  Patty: React.ReactNode;
}

class BurgerReactFromJSON extends ReactFromJSON<Mapping, Components> {
  render(): JSX.Element {
    return super.render();
  }
}

const Example = () => {
  return (
    <BurgerReactFromJSON
      entry={entry}
      mapping={mapping}
      components={components}
    />
  );
};
```

## License

MIT © [hydrateio](https://github.com/hydrateio)
