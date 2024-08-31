import { act, renderHook } from "@testing-library/react";
import { useTranslation } from "../useTranslation";

describe("useTranslation", () => {
  it("should initialize with default language", () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current.language).toBe("ja");
  });

  it("should return the correct translation for a key", () => {
    const { result } = renderHook(() => useTranslation());
    const { t } = result.current;

    expect(t("hi")).toBe("こんにちは");
    expect(t("nested.value")).toBe("これはネストされたメッセージです");
  });

  it("should set language en", () => {
    const { result } = renderHook(() => useTranslation());
    const { setLanguage } = result.current;
    act(() => {
      setLanguage("en");
    });

    expect(result.current.language).toBe("en");
  });

  it("should fallback to the fallback language", () => {
    const { result } = renderHook(() => useTranslation());
    const { t, setLanguage, setFallbackLanguage } = result.current;

    act(() => {
      setLanguage("en");
      setFallbackLanguage("ja");
    });

    expect(t("hi")).toBe("Hello");
    expect(t("nested.value")).toBe("This is a nested message");
  });

  it("should update language correctly", () => {
    const { result } = renderHook(() => useTranslation());
    const { t, setLanguage } = result.current;

    act(() => {
      setLanguage("en");
    });

    expect(t("hi")).toBe("Hello");
    expect(t("nested.value")).toBe("This is a nested message");
  });
});
