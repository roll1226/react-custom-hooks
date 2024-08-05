import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

const UseClickOutside = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        Open
      </button>
      <div
        ref={modalRef}
        style={{
          display: isOpen ? "block" : "none",
          backgroundColor: "blue",
          color: "white",
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "calc(50% - 50px)",
          left: "calc(50% - 50px)",
        }}
      >
        <span>Modal</span>
      </div>
    </div>
  );
};

export default UseClickOutside;
