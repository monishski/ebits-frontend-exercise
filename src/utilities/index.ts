import { DeltaColor } from "../types/enums";

export const getDigitColor = (n: number): DeltaColor => {
  return n === 0
    ? DeltaColor.neutral
    : n > 0
    ? DeltaColor.positive
    : DeltaColor.negative;
};

export const getAbsIntDiff = (a: number, b: number) => {
  return Math.abs(Math.floor(a) - Math.floor(b));
};

export const getDecimals = (n: number): string => {
  //only first instance of 0 is removed
  return (n - Math.floor(n)).toFixed(2).replace("0", "");
};
