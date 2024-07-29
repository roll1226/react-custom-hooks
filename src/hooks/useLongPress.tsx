import { MutableRefObject, useEffect } from "react";
import { useEffectOnce } from "./useEffectOnce";
import { useTimeout } from "./useTimeout";

type UseLongPressOptions = {
  delay?: number;
};

type UseLongPress = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  cb: () => void,
  { delay }: UseLongPressOptions
) => void;

export const useLongPress: UseLongPress = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  cb: () => void,
  { delay = 250 }: UseLongPressOptions = {}
) => {
  const { reset, clear } = useTimeout(cb, delay);

  useEffectOnce(clear);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = () => reset();
    const handleMouseUp = () => clear();
    const handleMouseLeave = () => clear();
    const handleTouchEnd = () => clear();

    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ref, reset, clear]);
};
