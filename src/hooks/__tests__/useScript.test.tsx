import { act, renderHook, waitFor } from "@testing-library/react";
import { useScript } from "../useScript";

describe("useScript", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should append a script element with the given URL", async () => {
    const url = "https://example.com/script.js";

    const { result } = renderHook(() => useScript(url));

    const script = document.querySelector("script");
    expect(script).toBeTruthy();
    expect(script?.src).toBe(url);

    act(() => {
      script?.dispatchEvent(new Event("load"));
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(undefined);
  });

  it("should handle script loading failure", async () => {
    const url = "https://example.com/script-fail.js";

    const { result } = renderHook(() => useScript(url));

    const script = document.querySelector("script");
    expect(script).toBeTruthy();
    expect(script?.src).toBe(url);

    act(() => {
      script?.dispatchEvent(new Event("error"));
    });

    await waitFor(() =>
      expect(result.current.error?.message).toBe(
        `Failed to load script: ${url}`
      )
    );

    expect(result.current.loading).toBe(false);
  });
});
