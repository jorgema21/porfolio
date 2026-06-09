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
};

export const about: Record<"es" | "en", AboutDict> = {
  es: {
    title: "Sobre mí",

    intro: [
      {
        text: "Soy periodista e infografista independiente, especializado en ",
      },
      {
        text: "visualización de datos, periodismo visual y contenidos de estilo de vida y maternidad.",
        bold: true,
      },
    ],

    focus: [
      {
        text: "Trabajo de forma autónoma, en solitario o equipo, con medios y marcas para elaborar ",
      },
      {
        text: "historias claras, rigurosas y de alto impacto. Me apasiona explorar desde fenómenos de masas o de interés popular a través de datos ",
      },
      {
        text: "hasta temas de psicología aplicados a la vida cotidiana de las personas en general o padres y madres en particular. ",
      },
    ],

    timelineTitle: "Cómo he llegado hasta aquí",
    study: "Estudio",
    infographics: "Infografía",
    lifestyle: "Estilo de vida",
    motherhood: "Maternidad",
    skillsTitle: "Lo que me gusta hacer",
    languagesTitle: "Idiomas que utilizo",
    cta: "Disponible para proyectos de infografía y datos y colaboraciones de estilo de vida y maternidad",
  },

  en: {
    title: "About me",

    intro: [
      {
        text: "I am a freelance journalist and information designer, specializing in ",
      },
      {
        text: "data visualization, visual journalism, and lifestyle and maternity content.",
        bold: true,
      },
    ],

    focus: [
      {
        text: "I work independently, either solo or as part of a team, collaborating with media outlets and brands to craft ",
      },
      {
        text: "clear, rigorous, and high-impact stories. I am deeply passionate about exploring everything from mass phenomena and trending cultural topics through data, ",
      },
      {
        text: "to psychological concepts applied to everyday life for the general public, as well as mothers and fathers in particular. ",
      },
    ],

    timelineTitle: "How I got here",
    study: "Study",
    infographics: "Infographics",
    lifestyle: "Lifestyle",
    motherhood: "Motherhood",
    skillsTitle: "What I enjoy doing",
    languagesTitle: "Languages I use",
    cta: "Available for data and infographic projects, as well as lifestyle and maternity collaborations",
  },
};
