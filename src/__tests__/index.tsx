import * as React from "react";
import ReactFromJSON from "../";
import * as renderer from "react-test-renderer";

import { Mapping, Components } from "../__helpers__/interfaces";
import {
  mapping,
  recursiveEntry,
  entryWithDifferentShape,
  flatEntry,
  flatComponents
} from "../__helpers__/data";

class BurgerReactFromJSON extends ReactFromJSON<Mapping, Components> {
  render(): JSX.Element {
    return super.render();
  }
}

describe("ReactFromJSON", () => {
  it("to render a recursive entry", () => {
    const tree = renderer
      .create(<BurgerReactFromJSON entry={recursiveEntry} mapping={mapping} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("to render a recursive entry with a non-standard shape", () => {
    const tree = renderer
      .create(
        <BurgerReactFromJSON
          entry={entryWithDifferentShape}
          mapping={mapping}
          mapProp={prop => {
            if (prop._type) {
              const { _type, ...props } = prop;

              return {
                type: _type,
                props
              };
            }

            return prop;
          }}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("to render a flat entry with a components attribute", () => {
    const tree = renderer
      .create(
        <BurgerReactFromJSON
          entry={flatEntry}
          mapping={mapping}
          components={flatComponents}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
