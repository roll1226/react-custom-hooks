import { useRef, useState } from "react";
import "./App.css";
import { useArray } from "./hooks/useArray";
import { useAsync } from "./hooks/useAsync";
import { useClickOutside } from "./hooks/useClickOutside";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import { useHover } from "./hooks/useHover";
import { useLocation } from "./hooks/useLocation";
import { useLongPress } from "./hooks/useLongPress";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { useOnScreen } from "./hooks/useOnScreen";
import { usePrevious } from "./hooks/usePrevious";
import { useRenderCount } from "./hooks/useRenderCount";
import { useScript } from "./hooks/useScript";
import { useStateWithHistory } from "./hooks/useStateWithHistory";
import { useStateWithValidation } from "./hooks/useStateWithValidation";
import { useLocalStorage, useSessionStorage } from "./hooks/useStorage";
import { useTimeout } from "./hooks/useTimeout";
import { useToggle } from "./hooks/useToggle";
import { useTranslation } from "./hooks/useTranslation";
import { useUpdateEffect } from "./hooks/useUpdateEffect";
import { useWindowSize } from "./hooks/useWindowSize";
import useAppRoutes from "./routes";

function App() {
  const router = useAppRoutes();

  const [username, setUsername, isValid] = useStateWithValidation<string>(
    (name) => name.length > 5,
    ""
  );

  const [count, setCount] = useState(10);
  const { clear, reset } = useTimeout(() => setCount((v) => v + 10), 1000);

  const {
    array,
    set,
    push,
    remove,
    filter,
    update,
    clear: arrayClear,
  } = useArray([1, 2, 3, 4, 5, 6]);

  const { loading, error, value } = useAsync(() => {
    return new Promise((resolve, reject) => {
      const success = false;
      setTimeout(() => {
        success ? resolve("Hi") : reject("Error");
      }, 1000);
    });
  });

  const elementRef = useRef<HTMLDivElement | null>(null);
  useLongPress(elementRef, () => alert("Long Press"), { delay: 500 });

  const [openFlg, setOpenFlg] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, () => {
    if (openFlg) setOpenFlg(false);
  });

  const [copyToClipboard, { success }] = useCopyToClipboard();

  const [count2, setCount2] = useState(10);
  useDebounce(() => alert(count2), 1000, [count2]);

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
      {router}
      <div>Valid: {isValid.toString()}</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div
        ref={elementRef}
        style={{
          backgroundColor: "red",
          width: "100px",
          height: "100px",
        }}
      />
      <div>
        <div>{count}</div>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={clear}>Clear Timeout</button>
        <button onClick={reset}>Reset Timeout</button>
      </div>
      <div>
        <div>{array.join(", ")}</div>
        <button onClick={() => push(7)}>Add 7</button>
        <button onClick={() => update(1, 9)}>Change Second Element To 9</button>
        <button onClick={() => remove(1)}>Remove Second Element</button>
        <button onClick={() => filter((n) => n < 3)}>
          Keep Numbers Less Than 4
        </button>
        <button onClick={() => set([1, 2])}>Set To 1, 2</button>
        <button onClick={arrayClear}>Clear</button>
      </div>
      <div>
        <div>Loading: {loading.toString()}</div>
        <div>{JSON.stringify(error)}</div>
        <div>{JSON.stringify(value)}</div>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenFlg(true);
          }}
        >
          Open
        </button>
        <div
          ref={modalRef}
          style={{
            display: openFlg ? "block" : "none",
            backgroundColor: "blue",
            color: "white",
            width: "100px",
            height: "100px",
            position: "absolute",
            top: "calc(50% - 50px)",
            left: "calc(50% - 50px)",
          }}
        >
          <span>Modal</span>
        </div>
      </div>
      <div>
        <button onClick={() => copyToClipboard("This was copied")}>
          {success ? "Copied" : "Copy Text"}
        </button>
        <input type="text" />
      </div>
      <div>
        <div>{count2}</div>
        <button onClick={() => setCount2((c) => c + 1)}>Increment</button>
      </div>
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
