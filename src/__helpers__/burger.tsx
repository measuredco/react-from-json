import * as React from "react";

export const Bun = ({ variant }: { variant: string }) => (
  <div>{`${variant} bun`}</div>
);

export const Patty = ({
  id,
  size,
  ingredient
}: {
  id: number;
  size: string;
  ingredient: React.ReactNode;
}) => (
  <div id={`${id}`}>
    {`${size} patty`}
    {ingredient}
  </div>
);

export const PattyIngredient = ({ variant }: { variant: string }) => (
  <div>{variant}</div>
);

export const Burger = ({
  bun,
  cheese,
  children
}: {
  bun: React.ReactNode;
  chain: string;
  cheese: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <div>{bun}</div>
    <div>{cheese && "cheese"}</div>
    <div>{children}</div>
    <div>{bun}</div>
  </div>
);
