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
      {
        text: "Aquí encontrarás mis reportajes sobre ",
      },
      {
        text: "maternidad, paternidad y crianza, ",
        bold: true,
      },
      {
        text: "con especial atención al bienestar emocional de las familias.",
      },
    ],
    aim: [
      {
        text: "Me interesa especialmente ",
      },
      {
        text: "la psicología que hay detrás de ser madre o padre, ",
        bold: true,
      },
      {
        text: "cómo crecen los niños y todas las dudas, cambios o errores que aparecen en la vida familiar.",
      },
    ] satisfies RichText,
  },

  en: {
    title: "Parenting",
    others: "Others",

    intro: [
      {
        text: "Welcome to the ",
      },
      {
        text: "parenting ",
        bold: true,
      },
      {
        text: "section.",
      },
    ],
    aim: [
      {
        text: "My aim is to explore ",
      },
      {
        text: "how psychology influences the everyday lives of parents and their children.",
        bold: true,
      },
    ] satisfies RichText,
  },
};
