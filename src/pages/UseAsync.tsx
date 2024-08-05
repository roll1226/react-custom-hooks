import { FC } from "react";
import { useAsync } from "../hooks/useAsync";

const UseAsync: FC = () => {
  const { loading, error, value } = useAsync(() => {
    return new Promise((resolve, reject) => {
      const success = false;
      setTimeout(() => {
        success ? resolve("Hi") : reject("Error");
      }, 1000);
    });
  });

  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{JSON.stringify(error)}</div>
      <div>{JSON.stringify(value)}</div>
    </div>
  );
};

export default UseAsync;
