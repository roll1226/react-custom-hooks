import { FC } from "react";
import { useArray } from "../hooks/useArray";

const UseArray: FC = () => {
  const {
    array,
    set,
    push,
    remove,
    filter,
    update,
    clear: arrayClear,
  } = useArray([1, 2, 3, 4, 5, 6]);

  return (
    <div>
      <div>{array.join(", ")}</div>
      <button onClick={() => push(7)}>7を追加</button>
      <button onClick={() => update(1, 9)}>2番目の要素を9に変える</button>
      <button onClick={() => remove(1)}>2番目の要素を削除</button>
      <button onClick={() => filter((n) => n < 3)}>
        要素で4未満の値を残す
      </button>
      <button onClick={() => set([1, 2])}>配列を[1,2]に変更</button>
      <button onClick={arrayClear}>クリア</button>
    </div>
  );
};

export default UseArray;
