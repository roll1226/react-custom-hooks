import { DependencyList, useEffect, useRef } from "react";

type CallbackFunction = () => void;

type UseUpdateEffect = (
  callback: CallbackFunction,
  dependencies: DependencyList
) => void;

export const useUpdateEffect: UseUpdateEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
