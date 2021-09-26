import { default as React, useState, useRef, SyntheticEvent } from "react";
import { Spinner } from "./Spinner";
import { Number } from "./Number";

interface IHeadlineFigureProps {
  currencySign: string;
  title: string | null;
  prevPrice: number | null;
  price: number | null;
  time: string | null;
}

export const HeadlineFigure = ({
  currencySign,
  title,
  prevPrice,
  price,
  time,
}: IHeadlineFigureProps): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [leftOffset, setLeftOffset] = useState<number>(0);
  const [topOffset, setTopOffset] = useState<number>(0);

  const onMouseEnterHandler = (e: SyntheticEvent) => {
    setShowTooltip(true);
  };

  const onMouseLeaveHandler = (e: SyntheticEvent) => {
    setShowTooltip(false);
  };

  const onMouseMoveHandler = (
    e: SyntheticEvent<HTMLDListElement, MouseEvent>,
  ) => {
    const { pageX, pageY } = e.nativeEvent;
    setLeftOffset(pageX);
    setTopOffset(pageY);
  };

  return (
    <dl
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onMouseMove={onMouseMoveHandler}
      className="w-1/3 mx-auto bg-white rounded-lg shadow-lg"
    >
      <div className="flex flex-col p-6 text-center border-t border-gray-100 items-center">
        <dt className="order-2 mt-4 text-lg font-medium leading-6 text-gray-500">
          {title}
        </dt>
        {!price ? (
          <Spinner />
        ) : (
          <Number
            currencySign={currencySign}
            prevPrice={prevPrice}
            price={price}
          />
        )}
      </div>
      {!!price && showTooltip ? (
        <div
          className="fixed bg-gray-100 border-gray-100 rounded-lg p-2 shadow text-gray-500"
          style={{ left: leftOffset, top: topOffset }}
        >
          {time}
        </div>
      ) : null}
    </dl>
  );
};
