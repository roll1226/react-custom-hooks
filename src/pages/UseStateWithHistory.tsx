import { FC, useState } from "react";
import { useStateWithHistory } from "../hooks/useStateWithHistory";

const UseStateWithHistory: FC = () => {
  const [count, setCount, { history, pointer, back, forward, go }] =
    useStateWithHistory(1);
  const [name, setName] = useState("roll1226");

  return (
    <div>
      <div>{count}</div>
      <div>{history.join(", ")}</div>
      <div>Pointer - {pointer}</div>
      <div>{name}</div>
      <button onClick={() => setCount((currentCount) => currentCount * 2)}>
        x2
      </button>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        +1
      </button>
      <button onClick={back}>戻る</button>
      <button onClick={forward}>進む</button>
      <button onClick={() => go(2)}>インデックス2に移動</button>
      <button onClick={() => setName("John")}>再レンダリング(名前変更)</button>
    </div>
  );
};

export default UseStateWithHistory;
