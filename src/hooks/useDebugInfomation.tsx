import { useEffect, useRef } from "react";
import { useRenderCount } from "./useRenderCount";

type ChangedProps<T> = {
  [K in keyof T]?: {
    previous: T[K];
    current: T[K];
  };
};

type Info<T> = {
  count: number;
  changedProps: ChangedProps<T>;
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
};

type UseDebugInformationReturn<T> = Info<T>;

type UseDebugInformation = <T extends Record<string, unknown>>(
  componentName: string,
  props: T
) => UseDebugInformationReturn<T>;

export const useDebugInformation: UseDebugInformation = (
  componentName,
  props
) => {
  const count = useRenderCount();
  const changedProps = useRef<ChangedProps<typeof props>>({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());

  const propKeys = Object.keys(props) as Array<keyof typeof props>;

  changedProps.current = propKeys.reduce<ChangedProps<typeof props>>(
    (obj, key) => {
      if (props[key] === previousProps.current[key]) return obj;
      return {
        ...obj,
        [key]: {
          previous: previousProps.current[key],
          current: props[key],
        },
      };
    },
    {}
  );

  const info: Info<typeof props> = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log("[debug-info]", componentName, info);
  });

  return info;
};
