export interface Components {
  Bun: object[];
  Patty: object[];
  PattyIngredient: object[];
}

export interface Mapping {
  Bun: React.FC<any>;
  Burger: React.FC<any>;
  Patty: React.FC<any>;
  PattyIngredient: React.FC<any>;
}
