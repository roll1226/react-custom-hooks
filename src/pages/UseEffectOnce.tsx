import { FC, useState } from "react";
import { useEffectOnce } from "../hooks/useEffectOnce";

const UseEffectOnce: FC = () => {
  const [count, setCount] = useState<number>(0);
  useEffectOnce(() => {
    console.log("マウント");
    return () => {
      console.log("アンマウント");
    };
  });

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};

export default UseEffectOnce;
