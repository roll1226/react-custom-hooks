import { useEffect, useRef } from "react";

type UsePrevious = <T>(value: T) => T | undefined;

export const usePrevious: UsePrevious = <T,>(value: T) => {
  const currentRef = useRef<T>(value);

  useEffect(() => {
    if (currentRef.current !== value) {
      currentRef.current = value;
    }
  }, [value]);

  return currentRef.current;
};
