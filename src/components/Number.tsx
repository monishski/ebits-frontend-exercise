import { default as React } from "react";
import { parsePriceDecimals } from "../utilities";

interface IPropsNumber {
  price: number;
}

export const Number = ({ price }: IPropsNumber) => {
  return (
    <dd className="order-1 text-5xl font-extrabold text-gray-500">
      ${Math.floor(price)}
      <span className="text-2xl">{parsePriceDecimals(price)}</span>
    </dd>
  );
};
