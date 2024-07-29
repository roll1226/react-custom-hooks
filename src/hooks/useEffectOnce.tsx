import { useEffect } from "react";

type UseEffectOnce = (cb: React.EffectCallback) => void;

export const useEffectOnce: UseEffectOnce = (cb) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
};
