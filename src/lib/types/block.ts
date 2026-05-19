import type { TranslatedText } from "./project.types";

export type TranslatedRichText = {
  es: string | string[];
  en: string | string[];
};

export type TextBlock = {
  type: "text";
  value: TranslatedText | TranslatedRichText;
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
