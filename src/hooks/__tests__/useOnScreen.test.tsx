import { act, renderHook } from "@testing-library/react";
import { MutableRefObject } from "react";
import { useOnScreen } from "../useOnScreen";

class IntersectionObserverMock implements IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: ReadonlyArray<number> = [];
  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
  disconnect: () => void;
  takeRecords: () => IntersectionObserverEntry[] = () => [];
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    this.observe = vi.fn();
    this.unobserve = vi.fn();
    this.disconnect = vi.fn();
  }

  trigger(entries: Partial<IntersectionObserverEntry>[]) {
    this.callback(entries as IntersectionObserverEntry[], this);
  }
}

describe("useOnScreen", () => {
  let observerMock: IntersectionObserverMock;
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeAll(() => {
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = vi.fn((callback) => {
      observerMock = new IntersectionObserverMock(callback);
      return observerMock;
    }) as unknown as typeof IntersectionObserver;
  });

  afterAll(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
  });

  it("should return false if the element is not visible on the screen", () => {
    const ref: MutableRefObject<HTMLElement | null> = {
      current: document.createElement("div"),
    };
    const { result } = renderHook(() => useOnScreen(ref, "0px"));

    expect(result.current).toBe(false);
  });

  it("should return true when the element becomes visible", () => {
    const ref: MutableRefObject<HTMLElement | null> = {
      current: document.createElement("div"),
    };
    const { result } = renderHook(() => useOnScreen(ref, "0px"));

    act(() => {
      observerMock.trigger([{ isIntersecting: true }]);
    });

    expect(result.current).toBe(true);
  });

  it("should return false when the element becomes not visible", () => {
    const ref: MutableRefObject<HTMLElement | null> = {
      current: document.createElement("div"),
    };
    const { result } = renderHook(() => useOnScreen(ref, "0px"));

    act(() => {
      observerMock.trigger([{ isIntersecting: false }]);
    });

    expect(result.current).toBe(false);
  });
});
