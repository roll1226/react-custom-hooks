import { useEffect, useRef } from "react";

type UseRenderCount = () => number;

export const useRenderCount: UseRenderCount = () => {
  const count = useRef(1);
  useEffect(() => {
    count.current++;
  });
  return count.current;
};
