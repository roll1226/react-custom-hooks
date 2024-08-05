import { FC, useRef } from "react";
import { useLongPress } from "../hooks/useLongPress";

const UseLongPress: FC = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useLongPress(elementRef, () => alert("Long Press"), { delay: 500 });

  return (
    <div
      ref={elementRef}
      style={{
        backgroundColor: "red",
        width: "100px",
        height: "100px",
      }}
    />
  );
};

export default UseLongPress;
