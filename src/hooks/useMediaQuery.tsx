import { useEffect, useState } from "react";
import { useEventListener } from "./useEventListener";

type UseMediaQuery = (mediaQuery: string) => boolean;

export const useMediaQuery: UseMediaQuery = (mediaQuery) => {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    "change",
    (e: Event | MediaQueryListEvent) => {
      if ("matches" in e) {
        setIsMatch(e.matches);
      }
    },
    mediaQueryList
  );

  return isMatch;
};
