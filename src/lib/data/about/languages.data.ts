export type LanguageId =
  | "spanish"
  | "english"
  | "italian"
  | "french"
  | "catalan";

export type Language = {
  id: LanguageId;
  level: number;
  color: string;
  defaultSelected: boolean;
};

export const languages: Language[] = [
  {
    id: "spanish",
    level: 10,
    color: "var(--red-500)",
    defaultSelected: true,
  },

  {
    id: "english",
    level: 7,
    color: "var(--blue-500)",
    defaultSelected: true,
  },

  {
    id: "italian",
    level: 6,
    color: "var(--blue-300)",
    defaultSelected: false,
  },

  {
    id: "french",
    level: 3,
    color: "var(--blue-700)",
    defaultSelected: false,
  },

  {
    id: "catalan",
    level: 2,
    color: "var(--timeline-study)",
    defaultSelected: false,
  },
];
