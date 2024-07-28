import { DependencyList, useEffect } from "react";
import useEffectOnce from "./useEffectOnce";
import useTimeout from "./useTimeout";

// 型定義
type CallbackFunction = () => void;

export default function useDebounce(
  callback: CallbackFunction,
  delay: number,
  dependencies: DependencyList
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, reset]);

  useEffectOnce(clear);
}
