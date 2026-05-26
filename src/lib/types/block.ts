import type { TranslatedText } from "./project.types";
import type { RichText } from "$lib/i18n/rich-text.types";

export type TranslatedRichText = {
  es: RichText;
  en: RichText;
};

export type TextBlock = {
  type: "text";
  value: TranslatedRichText;
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
