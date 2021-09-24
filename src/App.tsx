import { default as React, useState, useEffect } from "react";
import { Error } from "./components/Error";
import { HeadlineFigure } from "./components/HeadlineFigure";
import axios from "axios";

import { IData, IResponseData } from "./types/interfaces";

interface IState extends IData {
  //opted for 1 merged state, is it better to use useReducer instead?
  prevPrice: number | null;
  error: string | null;
}

const url: string = "https://dev.ebitlabs.io/api/v1/fx/ETHUSD/ohlc";
const REFRESH_RATE = 5000;

const transformData = (data: IResponseData): IData => {
  let { close, startTime } = data;
  return { price: +close, time: startTime };
};

function App(): JSX.Element {
  const [state, setState] = useState<IState>({
    prevPrice: null,
    price: null,
    time: null,
    error: null,
  });

  const getData = async (): Promise<void> => {
    try {
      const { data } = await axios.get<IResponseData>(url);
      const { price, time } = transformData(data);
      setState((prevState) => {
        return {
          prevPrice: prevState.price,
          price,
          time,
          error: null,
        };
      });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error:
          "Failed to fetch latest pricing data, the price indicated may have changed...",
      }));
    }
  };

  useEffect(() => {
    getData();
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
        prevPrice={state.prevPrice}
        price={state.price}
        time={state.time}
      />
    </div>
  );
}

export default App;
