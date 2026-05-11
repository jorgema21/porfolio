import type { TranslatedText } from "./project.types";

export type TextBlock = {
  type: "text";
  value: TranslatedText | { es: string[]; en: string[] };
};

export type TranslatedRichText = {
  es: string | string[];
  en: string | string[];
};

export type ImageBlock = {
  type: "image" | "hero";
  src: string;
  alt?: TranslatedText;
  caption?: TranslatedText;
};

export type DividerBlock = {
  type: "divider";
};

export type Block = TextBlock | ImageBlock | DividerBlock;
