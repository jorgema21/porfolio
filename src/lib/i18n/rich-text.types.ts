export type RichTextNode =
  | string
  | {
      text: string;
      bold?: boolean;
      italic?: boolean;
      link?: string;
    };

export type RichText = RichTextNode[];