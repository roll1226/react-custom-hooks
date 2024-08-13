import { FC } from "react";
import { useTranslation } from "../hooks/useTranslation";

const UseTranslation: FC = () => {
  const { language, setLanguage, setFallbackLanguage, t } = useTranslation();

  return (
    <div>
      <div>{language}</div>
      <div>{t("hi") as string}</div>
      <div>{t("bye") as string}</div>
      <div>{t("nested.value") as string}</div>
      <button onClick={() => setLanguage("ja")}>Change To Japanese</button>
      <button onClick={() => setLanguage("en")}>Change To English</button>
      <button onClick={() => setFallbackLanguage("ja")}>Change FB Lang</button>
    </div>
  );
};

export default UseTranslation;
