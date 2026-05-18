import type { RichText } from "$lib/i18n/rich-text.types";

type AboutDict = {
  title: string;
  intro: RichText;
  focus: RichText;

  timelineTitle: string;
  study: string;
  infographics: string;
  lifestyle: string;
  motherhood: string;
  skillsTitle: string;
  languagesTitle: string;
  cta: string;
  downloadCV: string;
};

export const about: Record<"es" | "en", AboutDict> = {
  es: {
    title: "Sobre mí",

    intro: [
      {
        text: "Soy periodista y diseñador especializado en ",
      },
      {
        text: "visualización de datos e infografía.",
        bold: true,
      },
    ],

    focus: [
      {
        text: "Me gusta transformar información compleja en historias ",
      },
      {
        text: "claras, visuales y fáciles de entender",
        bold: true,
      },
      {
        text: ", con un enfoque creativo y cercano.",
      },
    ],

    timelineTitle: "Cómo he llegado hasta aquí",
    study: "Estudio",
    infographics: "Infografía",
    lifestyle: "Estilo de vida",
    motherhood: "Maternidad",
    skillsTitle: "Lo que me gusta hacer",
    languagesTitle: "Idiomas que utilizo",
    cta: "Disponible para proyectos y colaboraciones",
    downloadCV: "Descargar CV",
  },

  en: {
    title: "About me",

    intro: [
      {
        text: "I’m a journalist and designer specializing in ",
      },
      {
        text: "data visualization and infographics.",
        bold: true,
      },
    ],

    focus: [
      {
        text: "I enjoy turning complex information into ",
      },
      {
        text: "clear, visual and easy-to-understand stories",
        bold: true,
      },
      {
        text: ", with a creative and approachable touch.",
      },
    ],

    timelineTitle: "How I got here",
    study: "Study",
    infographics: "Infographics",
    lifestyle: "Lifestyle",
    motherhood: "Motherhood",
    skillsTitle: "What I enjoy doing",
    languagesTitle: "Languages I use",
    cta: "Available for projects and collaborations",
    downloadCV: "Download CV",
  },
};
