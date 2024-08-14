import { FC } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const UseWindowSize: FC = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      {width} x {height}
    </div>
  );
};

export default UseWindowSize;
