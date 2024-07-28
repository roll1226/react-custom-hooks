import { useCallback, useEffect, useState } from "react";

type AsyncCallback<T> = () => Promise<T>;

export default function useAsync<T>(
  callback: AsyncCallback<T>,
  dependencies: unknown[] = []
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [value, setValue] = useState<T | undefined>(undefined);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
