import { act, renderHook } from "@testing-library/react";
import { useMediaQuery } from "../useMediaQuery";

describe("useMediaQuery", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return true when the media query matches", () => {
    const matchMediaMock = vi.fn().mockImplementation((query) => {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));

    expect(result.current).toBe(true);
    expect(matchMediaMock).toHaveBeenCalledWith("(min-width: 600px)");
  });

  it("should return false when the media query does not match", () => {
    const matchMediaMock = vi.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));

    expect(result.current).toBe(false);
    expect(matchMediaMock).toHaveBeenCalledWith("(min-width: 600px)");
  });

  it("should update when the media query changes", () => {
    let changeHandler: (event: MediaQueryListEvent) => void = () => {};

    const matchMediaMock = vi.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn().mockImplementation((type, listener) => {
          if (type === "change") {
            changeHandler = listener;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));

    expect(result.current).toBe(false);

    act(() => {
      changeHandler({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
