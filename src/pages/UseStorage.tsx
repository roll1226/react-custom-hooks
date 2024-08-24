import { FC } from "react";
import { useLocalStorage, useSessionStorage } from "../hooks/useStorage";

const UseStorage: FC = () => {
  const [name, setName, removeName] = useSessionStorage("name", "roll1226");
  const [age, setAge, removeAge] = useLocalStorage("age", 25);

  return (
    <div>
      <div>
        {name} - {age}
      </div>
      <button onClick={() => setName("ROLL")}>名前をセット</button>
      <button onClick={() => setAge(30)}>年齢をセット</button>
      <button onClick={removeName}>名前を削除</button>
      <button onClick={removeAge}>年齢を削除</button>
    </div>
  );
};

export default UseStorage;
