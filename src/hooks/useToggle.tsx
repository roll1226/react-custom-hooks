import { MouseEvent, useState } from "react";

type UseToggleReturn = [
  boolean,
  (
    value: boolean | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void
];

type UseToggle = (defaultValue: boolean) => UseToggleReturn;

export const useToggle: UseToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = (
    value: boolean | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setValue((currentValue: boolean) =>
      typeof value === "boolean" ? value : !currentValue
    );
  };
  return [value, toggleValue];
};
