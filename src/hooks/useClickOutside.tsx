import { MutableRefObject } from "react";
import useEventListener from "./useEventListener";

export default function useClickOutside<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  cb: (event: MouseEvent) => void
) {
  useEventListener(
    "click",
    (e: MouseEvent) => {
      if (ref.current === null || ref.current.contains(e.target as Node))
        return;
      cb(e);
    },
    document
  );
}
