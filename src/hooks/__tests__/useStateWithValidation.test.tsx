import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useStateWithValidation } from "../useStateWithValidation";

describe("useStateWithValidation", () => {
  it("should initialize with the correct value and validation status", () => {
    const validationFunc = (value: number) => value > 0;

    const { result } = renderHook(() =>
      useStateWithValidation(validationFunc, 10)
    );

    const [state, , isValid] = result.current;

    expect(state).toBe(10);
    expect(isValid).toBe(true); // 10 > 0なのでtrue
  });

  it("should update state and validate the new value", () => {
    const validationFunc = (value: number) => value > 0;

    const { result } = renderHook(() =>
      useStateWithValidation(validationFunc, 10 as number)
    );

    const [, setState] = result.current;

    act(() => {
      setState(5);
    });

    const [newState, , isValid] = result.current;

    expect(newState).toBe(5);
    expect(isValid).toBe(true); // 5 > 0なのでtrue

    act(() => {
      setState(-1);
    });

    const [newState2, , isValid2] = result.current;

    expect(newState2).toBe(-1);
    expect(isValid2).toBe(false); // -1 <= 0なのでfalse
  });

  it("should support functional updates", () => {
    const validationFunc = (value: number) => value > 0;

    const { result } = renderHook(() =>
      useStateWithValidation(validationFunc, 10 as number)
    );

    const [, setState] = result.current;

    act(() => {
      setState((prevState) => prevState + 1);
    });

    const [newState, , isValid] = result.current;

    expect(newState).toBe(11); // 10 + 1
    expect(isValid).toBe(true); // 11 > 0なのでtrue
  });
});
