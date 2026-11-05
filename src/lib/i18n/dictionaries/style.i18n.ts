import type { RichText } from "#lib/i18n/rich-text.types.js";

type InfographicsDict = {
  title: string;
  others: string;
  intro: RichText;
  aim: RichText;
};

export const style: Record<"es" | "en", InfographicsDict> = {
  es: {
    title: "Estilo de vida",
    others: "Otros",

    intro: [
      {
        text: "En esta sección encontrarás mis artículos sobre ",
      },
      {
        text: "estilo de vida, relaciones personales y psicología. ",
        bold: true,
      },
    ],
    aim: [
      {
        text: "Me gusta escribir sobre ",
      },
      {
        text: "las cosas del día a día que nos hacen pensar o actuar ",
        bold: true,
      },
      {
        text: "de determinada manera e intentar entender por qué nos pasan."
      }
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
    aim: [
      {
        text: "My main aim is to explore ",
      },
      {
        text: "how psychology influences people's everyday lives.",
        bold: true,
      },
    ] satisfies RichText,
  },
};
