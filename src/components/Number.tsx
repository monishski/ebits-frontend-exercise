import { default as React } from "react";
import { getDigitColor, getAbsIntDiff, getDecimals } from "../utilities";
import { v4 as uuidv4 } from "uuid";

interface IPropsNumber {
  prevPrice: number | null;
  price: number;
}

export const Number = ({ prevPrice, price }: IPropsNumber) => {
  let _prevPrice = prevPrice || price; //if no prevPrice (e.g. initial load) default to price
  let delta = price - _prevPrice;

  let color = getDigitColor(delta);

  /*--------------------------------
  Find the number of digits that will need to be color 
  coded for Integer part of the new price
  --------------------------------*/
  let int: JSX.Element[] = [];
  let intPart = Math.floor(price).toString();
  let intNumDigitsChanged =
    getAbsIntDiff(price, _prevPrice) === 0
      ? 0 // no difference in the Integer parts of the 2 prices
      : getAbsIntDiff(price, _prevPrice).toString().length; // n digits for the difference in the Integer parts

  for (let i = 0; i < intPart.length; i++) {
    if (i > intPart.length - intNumDigitsChanged - 1) {
      int.push(
        <div key={uuidv4()} className={`text-${color}-500`}>
          {intPart[i]}
        </div>,
      );
    } else {
      int.push(
        <div key={uuidv4()} className="text-gray-500">
          {intPart[i]}
        </div>,
      );
    }
  }

  /*--------------------------------
  Find the number of digits that will need to be color 
  coded for Decimal part of the new price
  --------------------------------*/
  let decimal: JSX.Element[] = [];
  let decimalPart = getDecimals(price);
  let decimalNDigitsChanged = delta === 0 ? 0 : Math.abs(delta) > 0.09 ? 3 : 1; // 3 because of the dot (.)

  for (let i = 0; i < decimalPart.length; i++) {
    if (i > decimalPart.length - decimalNDigitsChanged - 1) {
      decimal.push(
        <div key={uuidv4()} className={`text-${color}-500`}>
          {decimalPart[i]}
        </div>,
      );
    } else {
      decimal.push(
        <div key={uuidv4()} className="text-gray-500">
          {decimalPart[i]}
        </div>,
      );
    }
  }

  return (
    <dd
      className={`flex items-end order-1 text-5xl font-extrabold text-${color}-500`}
    >
      <div className="flex">{int}</div>
      <span className="text-2xl flex">{decimal}</span>
    </dd>
  );
};
