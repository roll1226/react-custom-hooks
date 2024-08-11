import { FC } from "react";
import { useLocalStorage, useSessionStorage } from "../hooks/useStorage";

const UseLocalStorage: FC = () => {
  const [name, setName, removeName] = useSessionStorage("name", "roll1226");
  const [age, setAge, removeAge] = useLocalStorage("age", 26);

  return (
    <div>
      <div>
        {name} - {age}
      </div>
      <button onClick={() => setName("John")}>Set Name</button>
      <button onClick={() => setAge(40)}>Set Age</button>
      <button onClick={removeName}>Remove Name</button>
      <button onClick={removeAge}>Remove Age</button>
    </div>
  );
};

export default UseLocalStorage;
