import { FC, useRef } from "react";
import { useOnScreen } from "../hooks/useOnScreen";

const UseOnScreen: FC = () => {
  const headerTwoRef = useRef<HTMLDivElement | null>(null);
  const visible = useOnScreen(headerTwoRef, "-100px");

  return (
    <div>
      <h1>Header</h1>
      <div>...</div>
      <h1 ref={headerTwoRef}>Header 2 {visible && "(Visible)"}</h1>
      <div>...</div>
    </div>
  );
};

export default UseOnScreen;
