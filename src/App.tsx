import "./App.css";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  return (
    <>
      <Navbar />
      {router}
    </>
  );
}

export default App;
