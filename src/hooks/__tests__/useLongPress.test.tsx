import { act, renderHook } from "@testing-library/react";
import { useEffectOnce } from "../useEffectOnce";
import { useLongPress } from "../useLongPress";
import { useTimeout } from "../useTimeout";

vi.mock("../useEffectOnce");
vi.mock("../useTimeout");

describe("useLongPress", () => {
  let ref: React.MutableRefObject<HTMLDivElement | null>;
  let cb: ReturnType<typeof vi.fn>; // ここを変更

  beforeEach(() => {
    ref = { current: document.createElement("div") };
    cb = vi.fn();
    (useTimeout as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      reset: vi.fn(),
      clear: vi.fn(),
    });
    (useEffectOnce as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (cb) => cb()
    );
  });

  it("should trigger callback after long press", () => {
    renderHook(() => useLongPress(ref, cb, { delay: 500 }));

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mousedown"));
    });

    expect(
      useTimeout(() => console.log("reset"), 1000).reset
    ).toHaveBeenCalled();

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mouseup"));
    });

    expect(
      useTimeout(() => console.log("clear"), 1000).clear
    ).toHaveBeenCalled();
  });

  it("should clear timeout on mouse up or leave", () => {
    renderHook(() => useLongPress(ref, cb, { delay: 500 }));

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mousedown"));
      ref.current?.dispatchEvent(new MouseEvent("mouseup"));
    });

    expect(
      useTimeout(() => console.log("clear"), 0).clear
    ).toHaveBeenCalledTimes(2);

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mousedown"));
      ref.current?.dispatchEvent(new MouseEvent("mouseleave"));
    });

    expect(
      useTimeout(() => console.log("clear"), 0).clear
    ).toHaveBeenCalledTimes(3);
  });

  it("should clear timeout on touch end", () => {
    renderHook(() => useLongPress(ref, cb, { delay: 500 }));

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mousedown"));
      ref.current?.dispatchEvent(new TouchEvent("touchend"));
    });

    expect(useTimeout(() => console.log("clear"), 0).clear).toHaveBeenCalled();
  });
});
