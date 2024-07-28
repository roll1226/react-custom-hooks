import { useCallback, useEffect, useRef } from "react";

type CallbackFunction = () => void;

export default function useTimeout(
  callback: CallbackFunction,
  delay: number | null
) {
  const callbackRef = useRef<CallbackFunction>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const set = useCallback(() => {
    if (delay !== null) {
      timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }
  }, [delay]);
  const clear = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);
  return { reset, clear };
}
