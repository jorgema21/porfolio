import type { RichText } from "#lib/i18n/rich-text.types.js";

type InfographicsDict = {
  title: string;
  others: string;
  intro: RichText;
  aim: RichText;
};

export const parenting: Record<"es" | "en", InfographicsDict> = {
  es: {
    title: "Maternidad",
    others: "Otros",

    intro: [
      { text: "Aquí reúno mis textos sobre " },
      {
        text: "maternidad, crianza y vida familiar",
        bold: true,
      },
      { text: "." },
    ] satisfies RichText,

    aim: [
      { text: "Estos reportajes exploran " },
      {
        text: "los cambios, las dudas y los retos que viven adultos y niños en su relación cotidiana",
        bold: true,
      },
      { text: "." },
    ] satisfies RichText,
  },

  en: {
    title: "Parenting",
    others: "Others",

    intro: [
      { text: "Here I've brought together my writing on " },
      {
        text: "motherhood, parenting, and family life",
        bold: true,
      },
      { text: "." },
    ] satisfies RichText,

    aim: [
      { text: "These stories explore " },
      {
        text: "the changes, questions, and challenges that adults and children experience as they navigate everyday life together",
        bold: true,
      },
      { text: "." },
    ] satisfies RichText,
  },
};
