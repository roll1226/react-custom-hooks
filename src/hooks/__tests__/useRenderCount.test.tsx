import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRenderCount } from "../useRenderCount";

describe("useRenderCount", () => {
  it("should return 1 on the first render", () => {
    const { result } = renderHook(() => useRenderCount());

    expect(result.current).toBe(1);
  });

  it("should increment the count on each render", () => {
    const { result, rerender } = renderHook(() => useRenderCount());

    expect(result.current).toBe(1);

    act(() => {
      rerender();
    });
    expect(result.current).toBe(2);

    act(() => {
      rerender();
    });
    expect(result.current).toBe(3);
  });
});
