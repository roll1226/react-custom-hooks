import "./App.css";
import { useWindowSize } from "./hooks/useWindowSize";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  const { width, height } = useWindowSize();

  return (
    <>
      <Navbar />
      {router}

      <div>
        {width} x {height}
      </div>
    </>
  );
}

export default App;
