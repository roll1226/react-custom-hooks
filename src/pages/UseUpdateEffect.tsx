import { FC, useState } from "react";
import { useUpdateEffect } from "../hooks/useUpdateEffect";

const UseUpdateEffect: FC = () => {
  const [count, setCount] = useState(0);
  useUpdateEffect(() => console.log(count), [count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};

export default UseUpdateEffect;
