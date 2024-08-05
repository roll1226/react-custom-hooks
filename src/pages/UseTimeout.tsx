import { FC, useState } from "react";
import { useTimeout } from "../hooks/useTimeout";

const UseTimeout: FC = () => {
  const [count, setCount] = useState(10);
  const { clear, reset } = useTimeout(() => setCount((v) => v + 10), 1000);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={clear}>Clear Timeout</button>
      <button onClick={reset}>Reset Timeout</button>
    </div>
  );
};

export default UseTimeout;
