import { FC, useState } from "react";
import { usePrevious } from "../hooks/usePrevious";

const UsePrevious: FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("roll1226");
  const previousCount = usePrevious(count);

  return (
    <div>
      <div>
        {count} - {previousCount}
      </div>
      <div>{name}</div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        Increment
      </button>
      <button onClick={() => setName("John")}>Change Name</button>
    </div>
  );
};

export default UsePrevious;
