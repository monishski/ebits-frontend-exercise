import { default as React } from "react";
import { Error } from "./components/Error";
import { HeadlineFigure } from "./components/HeadlineFigure";
import { useFetch } from "./hooks/useFetch";

function App(): JSX.Element {
  const {
    prevPrice: prevPriceUSD,
    price: priceUSD,
    time: timeUSD,
    error: errorUSD,
  } = useFetch("ETHUSD");

  const {
    prevPrice: prevPriceGBP,
    price: priceGBP,
    time: timeGBP,
    error: errorGBP,
  } = useFetch("ETHGBP");

  return (
    <div className="pt-12 bg-gray-50 sm:pt-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ethereum Price
          </h2>
        </div>
      </div>
      {errorUSD && <Error message={errorUSD} />}
      {errorGBP && <Error message={errorGBP} />}
      <div className="pb-12 mt-4 bg-white sm:pb-16">
        <div className="relative">
          {/*self-closing div here..*/}
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex max-w-4xl mx-auto">
              <HeadlineFigure
                currencySign="$"
                title="ETH/USD"
                prevPrice={prevPriceUSD}
                price={priceUSD}
                time={timeUSD}
              />
              <HeadlineFigure
                currencySign="£"
                title="ETH/GBP"
                prevPrice={prevPriceGBP}
                price={priceGBP}
                time={timeGBP}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
