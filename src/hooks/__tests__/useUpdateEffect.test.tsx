import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useUpdateEffect } from "../useUpdateEffect";

describe("useUpdateEffect", () => {
  it("should not run the effect on initial render", () => {
    const callback = vi.fn();

    renderHook(() => {
      const [count, setCount] = useState(0);
      useUpdateEffect(callback, [count]);
      return { setCount };
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should run the effect on dependency update", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useUpdateEffect(callback, [count]);
      return { setCount };
    });

    act(() => {
      result.current.setCount(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should run the effect multiple times when dependency updates multiple times", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      useUpdateEffect(callback, [count]);
      return { setCount };
    });

    act(() => {
      result.current.setCount(1);
    });

    act(() => {
      result.current.setCount(2);
    });

    setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(2);
    }, 0);
  });
});
