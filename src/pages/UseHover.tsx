import { FC, useRef } from "react";
import { useHover } from "../hooks/useHover";

const UseHover: FC = () => {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      style={{
        backgroundColor: isHovered ? "blue" : "red",
        width: "100px",
        height: "100px",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: "auto",
      }}
    />
  );
};

export default UseHover;
