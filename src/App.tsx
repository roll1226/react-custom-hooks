import { useRef, useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { useHover } from "./hooks/useHover";
import { useLocation } from "./hooks/useLocation";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { useOnScreen } from "./hooks/useOnScreen";
import { usePrevious } from "./hooks/usePrevious";
import { useRenderCount } from "./hooks/useRenderCount";
import { useScript } from "./hooks/useScript";
import { useStateWithHistory } from "./hooks/useStateWithHistory";
import { useLocalStorage, useSessionStorage } from "./hooks/useStorage";
import { useToggle } from "./hooks/useToggle";
import { useTranslation } from "./hooks/useTranslation";
import { useUpdateEffect } from "./hooks/useUpdateEffect";
import { useWindowSize } from "./hooks/useWindowSize";
import useAppRoutes from "./routes";
import Navbar from "./routes/Navbar";

function App() {
  const router = useAppRoutes();

  const [toggle, toggleValue] = useToggle(false);
  const renderCount = useRenderCount();

  const hoverRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useHover(hoverRef);

  const online = useOnlineStatus();

  const headerTwoRef = useRef<HTMLDivElement | null>(null);
  const visible = useOnScreen(headerTwoRef, "-100px");

  const [checkCount, setCheckCount] = useState(0);
  const [name, setName] = useState("roll1226");
  const previousCount = usePrevious(checkCount);

  const [fetchId, setFetchId] = useState(1);
  const {
    loading: fetchLoading,
    error: fetchError,
    value: fetchValue,
  } = useFetch(`https://jsonplaceholder.typicode.com/todos/${fetchId}`, {}, [
    fetchId,
  ]);
  const {
    loading: locationLoading,
    error: locationError,
    data: locationData,
  } = useLocation();

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
        <div>{renderCount}</div>
        <div>{toggle.toString()}</div>
        <button onClick={toggleValue}>Toggle</button>
        <button onClick={() => toggleValue(true)}>Make True</button>
        <button onClick={() => toggleValue(false)}>Make False</button>
      </div>
      <div
        ref={hoverRef}
        style={{
          backgroundColor: isHovered ? "blue" : "red",
          width: "100px",
          height: "100px",
        }}
      />

      <div>{online.toString()}</div>

      <div>
        <h1>Header</h1>
        <div>...</div>
        <h1 ref={headerTwoRef}>Header 2 {visible && "(Visible)"}</h1>
        <div>...</div>
      </div>

      <div>
        <div>
          {checkCount} - {previousCount}
        </div>
        <div>{name}</div>
        <button
          onClick={() => setCheckCount((currentCount) => currentCount + 1)}
        >
          Increment
        </button>
        <button onClick={() => setName("John")}>Change Name</button>
      </div>

      <div>
        <div>{fetchId}</div>
        <button onClick={() => setFetchId((currentId) => currentId + 1)}>
          Increment ID
        </button>
        <div>Loading: {fetchLoading.toString()}</div>
        <div>{JSON.stringify(fetchError, null, 2)}</div>
        <div>{JSON.stringify(fetchValue, null, 2)}</div>
      </div>

      <div>
        <div>Loading: {locationLoading.toString()}</div>
        <div>Error: {locationError?.message}</div>
        <div>
          {locationData?.latitude} x {locationData?.longitude}
        </div>
      </div>

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
