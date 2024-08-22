import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useCopyToClipboard } from "../useCopyToClipboard";

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("should copy text to clipboard and update state", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
    });

    await act(async () => {
      result.current[0]("Hello, World!");
    });

    expect(writeTextMock).toHaveBeenCalledWith("Hello, World!");
    expect(result.current[1].value).toBe("Hello, World!");
    expect(result.current[1].success).toBe(true);
  });

  it("should handle copy failure and update state", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    const writeTextMock = vi.fn().mockRejectedValue(new Error("Copy failed"));
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
    });

    await act(async () => {
      result.current[0]("Hello, World!", { debug: true });
    });

    expect(result.current[1].value).toBe("Hello, World!");
    expect(result.current[1].success).toBe(true);
  });

  it("should reset success after timeout", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
    });

    await act(async () => {
      result.current[0]("Hello, World!");
    });

    expect(result.current[1].success).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current[1].success).toBe(false);
  });
});
