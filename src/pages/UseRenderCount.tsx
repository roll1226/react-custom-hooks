import { FC } from "react";
import { useRenderCount } from "../hooks/useRenderCount";
import { useToggle } from "../hooks/useToggle";

const UseRenderCount: FC = () => {
  const [toggle, setToggle] = useToggle(false);
  const renderCount = useRenderCount();

  return (
    <>
      <div>{toggle.toString()}</div>
      <div>{renderCount}</div>
      <button onClick={setToggle}>Toggle</button>
    </>
  );
};

export default UseRenderCount;
