import { useState } from "react";
import "./App.css";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useScript } from "./hooks/useScript";
import { useStateWithHistory } from "./hooks/useStateWithHistory";
import { useLocalStorage, useSessionStorage } from "./hooks/useStorage";
import { useTranslation } from "./hooks/useTranslation";
import { useUpdateEffect } from "./hooks/useUpdateEffect";
import { useWindowSize } from "./hooks/useWindowSize";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  const [sessionName, setSessionName, removeSessionName] = useSessionStorage(
    "name",
    "roll1226"
  );
  const [age, setAge, removeAge] = useLocalStorage("age", 26);

  const isLarge = useMediaQuery("(min-width: 600px)");

  const { loading: scriptLoading, error: scriptError } = useScript(
    "https://code.jquery.com/jquery-3.6.0.min.js"
  );

  const [
    historyCount,
    setHistoryCount,
    { history, pointer, back, forward, go },
  ] = useStateWithHistory(1);
  const [historyName, setHistoryName] = useState("roll1226");

  const { language, setLanguage, setFallbackLanguage, t } = useTranslation();

  const [updateCount, setUpdateCount] = useState(0);
  useUpdateEffect(() => console.log(updateCount), [updateCount]);

  const { width, height } = useWindowSize();

  return (
    <>
      <Navbar />
      {router}

      <div>
        <div>
          {sessionName} - {age}
        </div>
        <button onClick={() => setSessionName("John")}>Set Name</button>
        <button onClick={() => setAge(40)}>Set Age</button>
        <button onClick={removeSessionName}>Remove Name</button>
        <button onClick={removeAge}>Remove Age</button>
      </div>

      <div>Large: {isLarge.toString()}</div>

      <div>
        {scriptLoading && <div>Loading</div>}
        {scriptError && <div>Error</div>}
        {!scriptLoading && !scriptError && <div>load script</div>}
      </div>

      <div>
        <div>{historyCount}</div>
        <div>{history.join(", ")}</div>
        <div>Pointer - {pointer}</div>
        <div>{historyName}</div>
        <button
          onClick={() => setHistoryCount((currentCount) => currentCount * 2)}
        >
          Double
        </button>
        <button
          onClick={() => setHistoryCount((currentCount) => currentCount + 1)}
        >
          Increment
        </button>
        <button onClick={back}>Back</button>
        <button onClick={forward}>Forward</button>
        <button onClick={() => go(2)}>Go To Index 2</button>
        <button onClick={() => setHistoryName("John")}>Change Name</button>
      </div>

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
