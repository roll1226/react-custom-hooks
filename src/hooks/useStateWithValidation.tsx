import { useCallback, useState } from "react";

type ValidationFunction<T> = (value: T) => boolean;

type UseStateWithValidationReturn<T> = [
  T,
  (nextState: T | ((prevState: T) => T)) => void,
  boolean
];

type UseStateWithValidation = <T>(
  validationFunc: ValidationFunction<T>,
  initialValue: T
) => UseStateWithValidationReturn<T>;

export const useStateWithValidation: UseStateWithValidation = <T,>(
  validationFunc: ValidationFunction<T>,
  initialValue: T
) => {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(() => validationFunc(state));

  const onChange = useCallback(
    (nextState: T | ((prevState: T) => T)) => {
      const value =
        typeof nextState === "function"
          ? (nextState as (prevState: T) => T)(state)
          : nextState;
      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc, state]
  );

  return [state, onChange, isValid];
};
