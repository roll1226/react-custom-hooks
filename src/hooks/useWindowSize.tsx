import { useState } from "react";
import { useEventListener } from "./useEventListener";

type WindowSize = {
  width: number;
  height: number;
};

type UseWindowsSizeReturn = WindowSize;

type UseWindowsSize = () => UseWindowsSizeReturn;

export const useWindowSize: UseWindowsSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });
  return windowSize;
};
