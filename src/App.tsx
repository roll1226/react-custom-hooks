import "./App.css";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  return (
    <>
      <Navbar />
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {router}
      </body>
    </>
  );
}

export default App;
