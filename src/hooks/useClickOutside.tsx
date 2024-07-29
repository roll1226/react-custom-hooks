import { MutableRefObject } from "react";
import { useEventListener } from "./useEventListener";

type UseClickOutsideType = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  cb: (event: MouseEvent) => void
) => void;

export const useClickOutside: UseClickOutsideType = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  cb: (event: MouseEvent) => void
) => {
  useEventListener(
    "click",
    (e: MouseEvent) => {
      if (ref.current === null || ref.current.contains(e.target as Node))
        return;
      cb(e);
    },
    document
  );
};
