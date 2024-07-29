import { useRef, useState } from "react";
import "./App.css";
import { useArray } from "./hooks/useArray";
import { useAsync } from "./hooks/useAsync";
import { useClickOutside } from "./hooks/useClickOutside";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useDebounce } from "./hooks/useDebounce";
import { useLongPress } from "./hooks/useLongPress";
import { useRenderCount } from "./hooks/useRenderCount";
import { useStateWithValidation } from "./hooks/useStateWithValidation";
import { useTimeout } from "./hooks/useTimeout";
import { useToggle } from "./hooks/useToggle";

function App() {
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

  return (
    <>
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
    </>
  );
}

export default App;
