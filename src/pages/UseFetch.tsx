import { FC, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const UseFetch: FC = () => {
  const [fetchId, setFetchId] = useState(1);
  const {
    loading: fetchLoading,
    error: fetchError,
    value: fetchValue,
  } = useFetch(`https://jsonplaceholder.typicode.com/todos/${fetchId}`, {}, [
    fetchId,
  ]);

  return (
    <div>
      <div>{fetchId}</div>
      <button onClick={() => setFetchId((currentId) => currentId + 1)}>
        Increment ID
      </button>
      <div>Loading: {fetchLoading.toString()}</div>
      <div>{JSON.stringify(fetchError, null, 2)}</div>
      <div>{JSON.stringify(fetchValue, null, 2)}</div>
    </div>
  );
};

export default UseFetch;
