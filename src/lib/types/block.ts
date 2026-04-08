import type { TranslatedText } from "./project";

export type TextBlock = {
  type: "text";
  value: TranslatedText;
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
