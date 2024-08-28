import { act, renderHook } from "@testing-library/react";
import { useLocation } from "../useLocation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn(),
    clearWatch: vi.fn(),
  };
});

describe("useLocation", () => {
  it("should return location data on success", async () => {
    const mockPosition = {
      coords: {
        latitude: 35.6895,
        longitude: 139.6917,
        accuracy: 10,
      },
      timestamp: Date.now(),
    };

    // geolocation API をモック
    const getCurrentPositionMock = vi.fn((success) => success(mockPosition));
    const watchPositionMock = vi.fn((success) => {
      success(mockPosition);
      return 1; // watchPosition の ID を返す
    });
    navigator.geolocation.getCurrentPosition = getCurrentPositionMock;
    navigator.geolocation.watchPosition = watchPositionMock;
    navigator.geolocation.clearWatch = vi.fn();

    const { result } = renderHook(() => useLocation());

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // 状態更新を待つ
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({
      latitude: 35.6895,
      longitude: 139.6917,
      accuracy: 10,
    });
  });

  it("should handle geolocation error correctly", async () => {
    const mockError = {
      code: 1,
      message: "User denied Geolocation",
    };

    // geolocation API のエラーモック
    const getCurrentPositionMock = vi.fn((_success, error) => error(mockError));
    navigator.geolocation.getCurrentPosition = getCurrentPositionMock;
    navigator.geolocation.watchPosition = vi.fn();
    navigator.geolocation.clearWatch = vi.fn();

    const { result } = renderHook(() => useLocation());

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // 状態更新を待つ
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeNull();
  });

  it("should clear watch on unmount", () => {
    const watchPositionMock = vi.fn(() => 1); // watchPosition の ID を返す
    navigator.geolocation.watchPosition = watchPositionMock;
    navigator.geolocation.clearWatch = vi.fn();

    const { unmount } = renderHook(() => useLocation());

    unmount();

    expect(navigator.geolocation.clearWatch).toHaveBeenCalledWith(1);
  });
});
