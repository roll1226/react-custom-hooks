import { useCallback, useEffect, useRef } from "react";

type CallbackFunction = () => void;

type UseTimeoutReturn = {
  reset: () => void;
  clear: () => void;
};

type UseTimeout = (
  callback: CallbackFunction,
  delay: number | null
) => UseTimeoutReturn;

export const useTimeout: UseTimeout = (callback, delay) => {
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
};
