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
      { text: "En esta sección encontrarás mis artículos sobre " },
      {
        text: "estilo de vida, relaciones personales y psicología.",
        bold: true,
      },
    ] satisfies RichText,

    aim: [
      { text: "Me gusta escribir sobre " },
      {
        text: "las pequeñas cosas del día a día que influyen en cómo pensamos, sentimos y actuamos",
        bold: true,
      },
      { text: ", e intentar entender por qué nos afectan." },
    ] satisfies RichText,
  },

  en: {
    title: "Lifestyle",
    others: "Others",

    intro: [
      { text: "Here you'll find my articles on " },
      {
        text: "lifestyle, personal relationships, and psychology.",
        bold: true,
      },
    ] satisfies RichText,

    aim: [
      { text: "I enjoy writing about " },
      {
        text: "the everyday things that shape how we think, feel, and act",
        bold: true,
      },
      { text: ", and trying to understand why they affect us." },
    ] satisfies RichText,
  },
};
