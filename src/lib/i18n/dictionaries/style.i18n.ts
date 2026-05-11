import type { RichText } from "$lib/i18n/rich-text.types";

type InfographicsDict = {
  title: string;
others: string;
  intro: RichText;
  description: RichText;
  aim: RichText;

  
};

export const style: Record<"es" | "en", InfographicsDict> = {
  es: {
    title: "Estilo de vida",
    others: "Otros",

    intro: [
      {
        text: "Bienvenido/a a la sección de ",
      },
      {
        text: "estilo de vida. ",
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
        text: "cómo la psicología afecta a la vida cotidiana de las personas.",
        bold: true,
      },
    ] satisfies RichText,
  },

  en: {
    title: "Lifestyle",
    others: "Others",

    intro: [
      {
        text: "Welcome to the ",
      },
      {
        text: "lifestyle ",
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
        text: "how psychology influence people’s daily lives.",
        bold: true,
      },
    ] satisfies RichText,
  },
};
