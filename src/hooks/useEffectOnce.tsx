import { useEffect } from "react";

export default function useEffectOnce(cb: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
}
