import { useEffect, useRef } from "react";

type UsePrevious = <T>(value: T) => T | undefined;

export const usePrevious: UsePrevious = <T,>(value: T) => {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T>(value);

  useEffect(() => {
    console.log(value, currentRef.current, previousRef.current);

    if (currentRef.current !== value) {
      previousRef.current = currentRef.current;
      currentRef.current = value;
    }
  }, [value]);

  return previousRef.current;
};
