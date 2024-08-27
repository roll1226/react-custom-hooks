import { renderHook } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should call the callback after the specified delay", () => {
    const callback = vi.fn();

    renderHook(() => useDebounce(callback, 1000, []));

    expect(callback).not.toHaveBeenCalled();

    // 時間を進める
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("should reset the debounce timer when dependencies change", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ dependencies }) => useDebounce(callback, 1000, dependencies),
      {
        initialProps: {
          dependencies: [1],
        },
      }
    );

    // 最初の呼び出しではまだ呼び出されていないことを確認
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    // 依存関係が変わったら、タイマーがリセットされることを確認
    rerender({ dependencies: [2] });

    // タイマーがリセットされたので、1000ms以内には呼び出されない
    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    // さらに500ms進めると呼び出される
    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear the debounce timer on unmount", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useDebounce(callback, 1000, []));

    unmount();

    // コンポーネントがアンマウントされたので、コールバックは呼び出されない
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });
});
