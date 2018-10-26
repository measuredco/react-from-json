import * as React from "react";

export const Bun = ({
  variant,
  propIndex
}: {
  variant: string;
  propIndex?: number;
}) => (
  <div>
    <div>{propIndex && `Order: ${propIndex}`}</div>
    {`${variant} bun`}
  </div>
);

export const Patty = ({
  id,
  size,
  ingredient,
  propIndex
}: {
  id: number;
  size: string;
  ingredient: React.ReactNode;
  propIndex?: number;
}) => (
  <div id={`${id}`}>
    <div>{propIndex && `Order: ${propIndex}`}</div>
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
  children,
  propIndex
}: {
  bun: React.ReactNode;
  chain: string;
  cheese: boolean;
  children: React.ReactNode;
  propIndex?: number;
}) => (
  <div>
    <div>{propIndex && `Order: ${propIndex}`}</div>
    <div>{bun}</div>
    <div>{cheese && "cheese"}</div>
    <div>{children}</div>
    <div>{bun}</div>
  </div>
);
