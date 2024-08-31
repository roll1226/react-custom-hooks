import { act, renderHook } from "@testing-library/react";
import { useOnlineStatus } from "../useOnlineStatus";

describe("useOnlineStatus", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis.navigator, "onLine", {
      writable: true,
      value: true,
    });
  });

  it("should return true when online", () => {
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  it("should return false when offline", () => {
    Object.defineProperty(globalThis.navigator, "onLine", {
      writable: true,
      value: false,
    });

    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(false);
  });

  it("should update status to online when online event is triggered", () => {
    Object.defineProperty(globalThis.navigator, "onLine", {
      writable: true,
      value: false,
    });

    const { result } = renderHook(() => useOnlineStatus());

    act(() => {
      Object.defineProperty(globalThis.navigator, "onLine", {
        writable: true,
        value: true,
      });
      window.dispatchEvent(new Event("online"));
    });

    expect(result.current).toBe(true);
  });

  it("should update status to offline when offline event is triggered", () => {
    const { result } = renderHook(() => useOnlineStatus());

    act(() => {
      Object.defineProperty(globalThis.navigator, "onLine", {
        writable: true,
        value: false,
      });
      window.dispatchEvent(new Event("offline"));
    });

    expect(result.current).toBe(false);
  });
});
