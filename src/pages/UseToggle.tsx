import { FC } from "react";
import { useToggle } from "../hooks/useToggle";

const UseToggle: FC = () => {
  const [toggle, toggleValue] = useToggle(false);

  return (
    <div>
      <div>{toggle.toString()}</div>
      <button onClick={toggleValue}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Make True</button>
      <button onClick={() => toggleValue(false)}>Make False</button>
    </div>
  );
};

export default UseToggle;
