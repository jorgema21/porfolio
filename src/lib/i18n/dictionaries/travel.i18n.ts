import type { RichText } from "#lib/i18n/rich-text.types.js";

type TravelDict = {
  title: string;
  others: string;
  intro: RichText;
  aim: RichText;
};

export const travel: Record<"es" | "en", TravelDict> = {
  es: {
    title: "Viajes",
    others: "Otros",

    intro: [
      { text: "Me interesa el mundo de los viajes como una forma de " },
      {
        text: "descubrir lugares y culturas con historias ",
        bold: true,
      },
      {
        text: "que merece la pena contar.",
      },
    ] satisfies RichText,

    aim: [
      { text: "Aquí reúno mis reportajes sobre " },
      {
        text: "destinos, experiencias y distintas formas de viajar, ",
        bold: true,
      },
      {
        text: "además de un apartado visual para explorar los lugares sobre los que he escrito.",
      },
    ] satisfies RichText,
  },

  en: {
    title: "Travel",
    others: "Others",

    intro: [
      { text: "I'm drawn to travel as a way " },
      {
        text: "to discover places and cultures ",
        bold: true,
      },
      {
        text: "with stories worth telling.",
      },
    ] satisfies RichText,

    aim: [
      { text: "Here you'll finde my travel features on " },
      {
        text: "destinations, experiences, and different ways of traveling, ",
        bold: true,
      },
      {
        text: "along with a visual section where you can explore the places I've written about.",
      },
    ] satisfies RichText,
  },
};
