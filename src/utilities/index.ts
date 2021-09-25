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

export const getDecimals = (n: number): number => {
  n = Math.abs(n);
  return n - Math.floor(n);
};

export const getUrl = (pair: string): string =>
  `https://dev.ebitlabs.io/api/v1/fx/${pair}/ohlc`;
