import type { RichText } from "$lib/i18n/rich-text.types";

type InfographicsDict = {
  title: string;
  others: string;
  intro: RichText;
  description: RichText;
  aim: RichText;
};

export const motherhood: Record<"es" | "en", InfographicsDict> = {
  es: {
    title: "Maternidad",
    others: "Otros",

    intro: [
      {
        text: "Bienvenido/a a la sección de ",
      },
      {
        text: "maternidad. ",
        bold: true,
      },
    ],
    description: [
      {
        text: "Aquí puedes acceder directamente a ",
      },
      {
        text: "todos los trabajos que se han publicado.",
        bold: true,
      },
    ],
    aim: [
      {
        text: "Mi propósito es escribir sobre ",
      },
      {
        text: "cómo la psicología afecta a la vida cotidiana de los padres y madres y a sus hijos.",
        bold: true,
      },
    ] satisfies RichText,
  },

  en: {
    title: "Motherhood",
    others: "Others",

    intro: [
      {
        text: "Welcome to the ",
      },
      {
        text: "motherhood ",
        bold: true,
      },
      {
        text: "section.",
      },
    ],
    description: [
      {
        text: "Here you can access directly to ",
      },
      {
        text: "all the works that have been published.",
        bold: true,
      },
    ],
    aim: [
      {
        text: "My aim is to write about ",
      },
      {
        text: "how psychology influence parents and their kids daily lives.",
        bold: true,
      },
    ] satisfies RichText,
  },
};
