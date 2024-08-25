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
      <button onClick={() => setLanguage("ja")}>日本語に変更</button>
      <button onClick={() => setLanguage("en")}>英語に変更</button>
      <button onClick={() => setFallbackLanguage("ja")}>
        フォールバック言語(日本語)
      </button>
    </div>
  );
};

export default UseTranslation;
