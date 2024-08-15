import * as translations from "../translations";
import { Translations } from "../types/translations";
import { useLocalStorage } from "./useStorage";

type TranslateKeys<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${TranslateKeys<T[K]>}`
        : `${K}`;
    }[keyof T & string]
  : never;
type TranslateKey = TranslateKeys<Translations>;

type TranslationKeys = {
  [key in TranslateKey]: TranslationKeys | string;
};
type Language = keyof typeof translations;

type UseTranslationReturn = {
  language: Language;
  setLanguage: (language: Language) => void;
  fallbackLanguage: Language;
  setFallbackLanguage: (fallbackLanguage: Language) => void;
  t: (key: TranslateKey) => string | TranslationKeys | undefined;
};

type UseTranslation = () => UseTranslationReturn;

export const useTranslation: UseTranslation = () => {
  const [language, setLanguage] = useLocalStorage<Language>("language", "ja");
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage<Language>(
    "fallbackLanguage",
    "ja"
  );

  const translate = (key: TranslateKey) => {
    const keys = key.split(".") as TranslateKey[];
    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  };
};

const getNestedTranslation = (
  language: Language,
  keys: TranslateKey[]
): string | TranslationKeys | undefined => {
  const languageTranslations = translations[
    language
  ] as unknown as TranslationKeys;

  return keys.reduce<string | TranslationKeys | undefined>((obj, key) => {
    if (obj && typeof obj === "object") {
      return (obj as TranslationKeys)[key];
    }
    return undefined;
  }, languageTranslations);
};
