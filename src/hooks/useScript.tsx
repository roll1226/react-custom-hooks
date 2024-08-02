import { useAsync, UseAsyncReturn } from "./useAsync";

type UseScript = (url: string) => UseAsyncReturn<void>;

export const useScript: UseScript = (url) => {
  return useAsync<void>(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    return new Promise<void>((resolve, reject) => {
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", () =>
        reject(new Error(`Failed to load script: ${url}`))
      );
      document.body.appendChild(script);
    });
  }, [url]);
};
