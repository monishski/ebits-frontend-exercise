import { default as React } from "react";
import { Spinner } from "./Spinner";
import { Number } from "./Number";

interface IHeadlineFigureProps {
  price: number | null;
  loading: boolean;
}

export const HeadlineFigure = ({
  price,
  loading,
}: IHeadlineFigureProps): JSX.Element => {
  return (
    <div className="pb-12 mt-4 bg-white sm:pb-16">
      <div className="relative">
        <div className="absolute inset-0 h-1/2 bg-gray-50" />
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <dl className="w-1/3 mx-auto bg-white rounded-lg shadow-lg">
              <div className="flex flex-col p-6 text-center border-t border-gray-100 items-center">
                <dt className="order-2 mt-4 text-lg font-medium leading-6 text-gray-500">
                  ETH/USD
                </dt>
                {loading || !price ? <Spinner /> : <Number price={price} />}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
