import { Bun, Burger, Patty, PattyIngredient } from "./burger";
import { Components, Mapping } from "./interfaces";

export const recursiveEntry = {
  type: "Burger",
  props: {
    chain: "Wahlburger",
    bun: {
      type: "Bun",
      props: {
        variant: "sesame"
      }
    },
    cheese: true,
    children: [
      {
        type: "Patty",
        props: {
          size: "large",
          ingredient: {
            type: "PattyIngredient",
            props: {
              variant: "impossible"
            }
          }
        }
      },
      {
        type: "Patty",
        props: {
          size: "large",
          ingredient: {
            type: "PattyIngredient",
            props: {
              variant: "beef"
            }
          }
        }
      }
    ]
  }
};

export const entryWithDifferentShape = {
  _type: "Burger",
  chain: "Wahlburger",
  bun: {
    _type: "Bun",
    variant: "sesame"
  },
  cheese: true,
  children: [
    {
      _type: "Patty",
      size: "large",
      ingredient: {
        _type: "PattyIngredient",
        variant: "impossible"
      }
    },
    {
      _type: "Patty",
      size: "large",
      ingredient: {
        _type: "PattyIngredient",
        variant: "beef"
      }
    }
  ]
};

export const flatEntry = {
  type: "Burger",
  props: {
    chain: "Wahlburger",
    bun: {
      type: "ComponentLookup",
      props: {
        componentType: "Bun",
        componentIndex: 0
      }
    },
    cheese: true,
    children: [
      {
        type: "ComponentLookup",
        props: {
          componentType: "Patty",
          componentIndex: 0
        }
      },
      {
        type: "ComponentLookup",
        props: {
          componentType: "Patty",
          componentIndex: 1
        }
      }
    ]
  }
};

export const flatComponents: Components = {
  Bun: [
    {
      type: "Bun",
      props: {
        variant: "sesame"
      }
    }
  ],
  Patty: [
    {
      type: "Patty",
      props: {
        size: "large",
        ingredient: {
          type: "ComponentLookup",
          props: {
            componentType: "PattyIngredient",
            componentIndex: 0
          }
        }
      }
    },
    {
      type: "Patty",
      props: {
        size: "large",
        ingredient: {
          type: "ComponentLookup",
          props: {
            componentType: "PattyIngredient",
            componentIndex: 1
          }
        }
      }
    }
  ],
  PattyIngredient: [
    {
      type: "PattyIngredient",
      props: {
        variant: "impossible"
      }
    },
    {
      type: "PattyIngredient",
      props: {
        variant: "beef"
      }
    }
  ]
};

export const mapping: Mapping = {
  Bun,
  Burger,
  Patty,
  PattyIngredient
};
