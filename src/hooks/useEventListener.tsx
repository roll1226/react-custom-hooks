import { RefObject, useEffect, useRef } from "react";

type EventType = keyof WindowEventMap;

type UseEventListener = <K extends EventType>(
  eventType: K,
  callback: (event: WindowEventMap[K]) => void,
  element?: Window | Document | HTMLElement | RefObject<HTMLElement | null>
) => void;

export const useEventListener: UseEventListener = <K extends EventType>(
  eventType: K,
  callback: (event: WindowEventMap[K]) => void,
  element:
    | Window
    | Document
    | HTMLElement
    | RefObject<HTMLElement | null> = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement: HTMLElement | Window | Document | null =
      element && "current" in element ? element.current : element;
    if (!targetElement) return;

    const handler = (event: WindowEventMap[K]) => callbackRef.current(event);

    targetElement.addEventListener(eventType, handler as EventListener);
    return () =>
      targetElement.removeEventListener(eventType, handler as EventListener);
  }, [eventType, element]);
};
