export interface IResponseData {
  close: string;
  count: number;
  endTime: string;
  high: string;
  low: string;
  open: string;
  pair: string;
  startTime: string;
  volume: string;
  vwap: string;
}

export interface IData {
  price: number | null;
  time: string | null;
}
