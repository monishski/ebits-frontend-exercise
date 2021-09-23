import { default as React } from "react";

interface IErrorProps {
  message: string;
}

export const Error = (props: IErrorProps): JSX.Element => {
  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 pl-4 w-3/6 m-auto mt-4"
      role="alert"
    >
      <p className="font-bold">Be Warned</p>
      <p>{props.message}</p>
    </div>
  );
};
