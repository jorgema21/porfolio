import type { RichText } from "$lib/i18n/rich-text.types";

type InfographicsDict = {
  title: string;

  intro: RichText;
  description: RichText;
};

export const style: Record<"es" | "en", InfographicsDict> = {
  es: {
    title: "Estilo de vida",


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
    ] satisfies RichText,
  },

  en: {
    title: "Lifestyle",


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
    ] satisfies RichText,
  },
};
