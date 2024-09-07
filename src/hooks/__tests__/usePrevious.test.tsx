import { act, renderHook } from "@testing-library/react";
import { usePrevious } from "../usePrevious";
describe("usePrevious", () => {
  it("should return undefined on the first render", () => {
    const { result } = renderHook(() => usePrevious("initial"));

    expect(result.current).toBe(undefined);
  });

  it("should return the previous value after updates", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "first" },
    });

    expect(result.current).toBe(undefined);

    act(() => {
      rerender({ value: "second" });
    });
    expect(result.current).toBe(undefined);

    act(() => {
      rerender({ value: "third" });
    });
    expect(result.current).toBe("first");
  });
});
