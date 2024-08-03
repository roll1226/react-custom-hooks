export interface Translations {
  hi: string;
  bye: string;
  nested: {
    value: string;
  };
}

declare module "*_translations.json" {
  const value: Translations;
  export default value;
}
