import { FC, useState } from "react";
import { useEventListener } from "../hooks/useEventListener";

const UseEventListener: FC = () => {
  const [key, setKey] = useState("");
  useEventListener<"keydown", KeyboardEvent>("keydown", (e) => {
    setKey(e.key);
  });

  return <div>Last Key: {key}</div>;
};

export default UseEventListener;
