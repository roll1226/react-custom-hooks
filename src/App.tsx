import { useState } from "react";
import "./App.css";
import { useUpdateEffect } from "./hooks/useUpdateEffect";
import { useWindowSize } from "./hooks/useWindowSize";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  const [updateCount, setUpdateCount] = useState(0);
  useUpdateEffect(() => console.log(updateCount), [updateCount]);

  const { width, height } = useWindowSize();

  return (
    <>
      <Navbar />
      {router}

      <div>
        <div>{updateCount}</div>
        <button onClick={() => setUpdateCount((c) => c + 1)}>Increment</button>
      </div>

      <div>
        {width} x {height}
      </div>
    </>
  );
}

export default App;
