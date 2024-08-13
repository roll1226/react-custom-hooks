import { useState } from "react";
import "./App.css";
import { useTranslation } from "./hooks/useTranslation";
import { useUpdateEffect } from "./hooks/useUpdateEffect";
import { useWindowSize } from "./hooks/useWindowSize";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  const { language, setLanguage, setFallbackLanguage, t } = useTranslation();

  const [updateCount, setUpdateCount] = useState(0);
  useUpdateEffect(() => console.log(updateCount), [updateCount]);

  const { width, height } = useWindowSize();

  return (
    <>
      <Navbar />
      {router}

      <div>
        <div>{language}</div>
        <div>{t("hi") as string}</div>
        <div>{t("bye") as string}</div>
        <div>{t("nested.value") as string}</div>
        <button onClick={() => setLanguage("ja")}>Change To Japanese</button>
        <button onClick={() => setLanguage("en")}>Change To English</button>
        <button onClick={() => setFallbackLanguage("ja")}>
          Change FB Lang
        </button>
      </div>

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
