import { useState, useEffect } from "react";
import { IData, IResponseData } from "../types/interfaces";
import { getUrl } from "../utilities";
import axios from "axios";

interface IState extends IData {
  //opted for 1 merged state, is it better to use useReducer instead?
  prevPrice: number | null;
  error: string | null;
}
const REFRESH_RATE = 5000;

const transformData = (data: IResponseData): IData => {
  let { close, startTime } = data;
  return { price: +close, time: startTime };
};

export const useFetch = (pair: string) => {
  const [state, setState] = useState<IState>({
    prevPrice: null,
    price: null,
    time: null,
    error: null,
  });

  const getData = async (_pair: string): Promise<void> => {
    try {
      const { data } = await axios.get<IResponseData>(getUrl(_pair));
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
        error: `Failed to fetch latest ${_pair} pricing data, the price indicated may have changed...`,
      }));
    }
  };

  useEffect(() => {
    getData(pair);
    const interval = setInterval(() => {
      getData(pair);
    }, REFRESH_RATE);
    return () => clearInterval(interval);
  }, []);

  return state;
};
