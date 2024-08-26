import { act, renderHook } from "@testing-library/react";
import { useTimeout } from "../useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should call the callback after the delay", () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should reset the timeout when reset is called", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      result.current.reset();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear the timeout when clear is called", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      result.current.clear();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should not set a timeout when delay is null", () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, null));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
