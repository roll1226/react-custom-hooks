import { useState } from "react";
import { useEventListener } from "./useEventListener";

type UseOnlineStatus = () => boolean;

export const useOnlineStatus: UseOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEventListener("online", () => setOnline(navigator.onLine));
  useEventListener("offline", () => setOnline(navigator.onLine));

  return online;
};
