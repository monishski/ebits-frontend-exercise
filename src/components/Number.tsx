import { default as React } from "react";
import { getDigitColor, getDecimals } from "../utilities";
import { v4 as uuidv4 } from "uuid";
import { DeltaColor } from "../types/enums";

interface IPropsNumber {
  currencySign: string;
  prevPrice: number | null;
  price: number;
}

const getIntNumDigitsChanged = (curr: number, prev: number): number => {
  let _curr = Math.floor(curr).toString();
  let _prev = Math.floor(prev).toString();
  let count = 0;
  for (let i = _curr.length; i >= 0; i--) {
    if (_curr[i] !== _prev[i]) {
      count++;
    }
  }
  return count;
};

const getDecimalNumDigitsChanged = (curr: number, prev: number): number => {
  //umm, possible cases, 19 18, 06 16
  if (getIntNumDigitsChanged(curr, prev) >= 1) {
    return 3;
  }
  let currDecimals = getDecimals(curr).toFixed(2).replace("0.", "");
  let prevDecimals = getDecimals(prev).toFixed(2).replace("0.", "");
  if (currDecimals[0] !== prevDecimals[0]) {
    return 3;
  }
  return 1;
};

export const Number = ({ currencySign, prevPrice, price }: IPropsNumber) => {
  let _prevPrice = prevPrice || price; //if no prevPrice (e.g. initial load) default to price
  let delta = price - _prevPrice;

  let color = getDigitColor(delta);

  /*--------------------------------
  Find the number of digits that will need to be color 
  coded for Integer part of the new price
  --------------------------------*/
  let int: JSX.Element[] = [];
  let intPart = Math.floor(price).toString();
  let intNumDigitsChanged = getIntNumDigitsChanged(price, _prevPrice);

  for (let i = 0; i < intPart.length; i++) {
    if (i > intPart.length - intNumDigitsChanged - 1) {
      int.push(
        <div key={uuidv4()} className={`text-${color}-500`}>
          {intPart[i]}
        </div>,
      );
    } else {
      int.push(
        <div key={uuidv4()} className={`text-${DeltaColor.neutral}-500`}>
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
  let decimalPart = getDecimals(price).toFixed(2).replace("0", "");
  let decimalNDigitsChanged = getDecimalNumDigitsChanged(price, _prevPrice);

  for (let i = 0; i < decimalPart.length; i++) {
    if (i > decimalPart.length - decimalNDigitsChanged - 1) {
      decimal.push(
        <div key={uuidv4()} className={`text-${color}-500`}>
          {decimalPart[i]}
        </div>,
      );
    } else {
      decimal.push(
        <div key={uuidv4()} className={`text-${DeltaColor.neutral}-500`}>
          {decimalPart[i]}
        </div>,
      );
    }
  }

  return (
    <dd className={`flex items-end order-1 text-5xl font-extrabold`}>
      <div className="flex">
        <div className={`text-${DeltaColor.neutral}-500`}>{currencySign}</div>
        {int}
      </div>
      <span className="text-2xl flex">{decimal}</span>
    </dd>
  );
};
