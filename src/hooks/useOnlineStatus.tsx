import { useState } from "react";
import { useEventListener } from "./useEventListener";

type UseOnlineStatus = () => boolean;

export const useOnlineStatus: UseOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  useEventListener<keyof WindowEventHandlersEventMap>("online", () =>
    setOnline(navigator.onLine)
  );
  useEventListener<keyof WindowEventHandlersEventMap>("offline", () =>
    setOnline(navigator.onLine)
  );
  return online;
};
