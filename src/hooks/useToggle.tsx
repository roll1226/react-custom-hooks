import { useState } from "react";

type UseToggleReturn = [boolean, (value: boolean) => void];

type UseToggle = (defaultValue: boolean) => UseToggleReturn;

export const useToggle: UseToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = (value: boolean) => {
    setValue((currentValue: boolean) =>
      typeof value === "boolean" ? value : !currentValue
    );
  };
  return [value, toggleValue];
};
