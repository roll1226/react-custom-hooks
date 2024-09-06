import { act, renderHook } from "@testing-library/react";
import { usePrevious } from "../usePrevious";
describe("usePrevious", () => {
  it("should return undefined on the first render", () => {
    const { result } = renderHook(() => usePrevious("initial"));

    // 初回レンダーでは previous は undefined
    expect(result.current).toBe(undefined);
  });

  it("should return the previous value after updates", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "first" }, // 最初の値
    });

    // 初回レンダーでは前の値は undefined
    expect(result.current).toBe(undefined);

    // 値を "second" に rerender
    act(() => {
      rerender({ value: "second" });
    });
    expect(result.current).toBe(undefined);

    // 値を "third" に rerender
    act(() => {
      rerender({ value: "third" });
    });
    expect(result.current).toBe("first");
  });
});
