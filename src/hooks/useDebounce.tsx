import { DependencyList, useEffect } from "react";
import { useEffectOnce } from "./useEffectOnce";
import { useTimeout } from "./useTimeout";

type CallbackFunction = () => void;

type UseDebounce = (
  callback: CallbackFunction,
  delay: number,
  dependencies: DependencyList
) => void;

export const useDebounce: UseDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reset]);

  useEffectOnce(clear);
};
