import { default as React, useState, useEffect } from "react";
import { Error } from "./components/Error";
import { HeadlineFigure } from "./components/HeadlineFigure";
import axios from "axios";

interface IResponseData {
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

interface IData {
  price: number | null;
  time: string | null;
}

interface IState extends IData {
  //opted for 1 merged state, is it better to use useReducer instead?
  error: string | null;
  loading: boolean;
}

const url: string = "https://dev.ebitlabs.io/api/v1/fx/ETHUSD/ohlc";
const REFRESH_RATE = 5000;

const transformData = (data: IResponseData): IData => {
  let { close, startTime } = data;
  return { price: +close, time: startTime };
};

function App(): JSX.Element {
  const [state, setState] = useState<IState>({
    price: null,
    time: null,
    error: null,
    loading: false,
  });

  const getData = async (): Promise<void> => {
    try {
      const { data } = await axios.get<IResponseData>(url);
      const { price, time } = transformData(data);
      setState((prevState) => ({
        ...prevState,
        price,
        time,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error:
          "Failed to fetch latest pricing data, the price indicated may have changed...",
      }));
    }
  };

  useEffect(() => {
    // Only show spinner on first mount
    setState((prevState) => ({ ...prevState, loading: true }));
    getData();
    setState((prevState) => ({ ...prevState, loading: false }));
    const interval = setInterval(() => {
      getData();
    }, REFRESH_RATE);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ethereum Price
          </h2>
        </div>
      </div>
      {state.error && <Error message={state.error} />}
      <HeadlineFigure
        loading={state.loading}
        price={state.price}
      ></HeadlineFigure>
    </div>
  );
}

export default App;
