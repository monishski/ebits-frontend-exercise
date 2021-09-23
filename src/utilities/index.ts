export const parsePriceDecimals = (n: number): string => {
  // return ((n - Math.floor(n)) * 100).toFixed(0); //toFixed() will round properly
  return (n - Math.floor(n)).toFixed(2).replace("0", ""); //only first instance of 0 is removed
};
