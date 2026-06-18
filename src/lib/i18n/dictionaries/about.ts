import type { RichText } from "$lib/i18n/rich-text.types";

type AboutDict = {
  title: string;
  intro: RichText;
  focus: RichText;

  timelineTitle: string;
  timelineDesc: string;

  miniTimelineTitle: string;
  miniTimeline: RichText;
  study: string;
  infographics: string;
  lifestyle: string;
  parenting: string;
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

    timelineTitle: "Mi trayectoria",
    timelineDesc:
      "Haz scroll para explorar mi trayectoria o investiga el resumen y pulsa el botón inferior para ir directamente al final.",

    miniTimelineTitle: "Ver resumen rápido",
    miniTimeline: [
      "Periodismo en Valladolid (sep. 2017-jul. 2021)",
      "Erasmus en Bérgamo (sep. 2019-jul. 2020)",
      "Máster de El País (oct. 2021-sep. 2023)",
      "Beca en Narrativas Visuales (sep. 2022-sep. 2023)",
      "El País Deportes (feb. a abr. 2024)",
      "Autónomo (desde abr. 2024): Colaboraciones con Artículo 14; El País Estilo de Vida, Mamas&Papas y Gente; Storydata; Colpisa y Dataista",
    ],
    study: "Estudio",
    infographics: "Infografía",
    lifestyle: "Estilo de vida",
    parenting: "Maternidad",
    skillsTitle: "Herramientas que uso",
    languagesTitle: "Idiomas que hablo",
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

    timelineTitle: "My Journey",
    timelineDesc:
      "Scroll down to explore my career path, review the summary, or click the button below to jump straight to the end.",
    miniTimelineTitle: "Quick summary",
    miniTimeline: [
      "Journalism Degree at Valladolid (sep. 2017-jul. 2021)",
      "Erasmus at Bérgamo (sep. 2019-jul. 2020)",
      "Master Degree with El País (oct. 2021-sep. 2023)",
      "Visual Storytelling Internship (sep. 2022-sep. 2023)",
      "El País Sports (feb. to apr. 2024)",
      "Freelance (from apr. 2024): Collaborations with Artículo 14; El País Lifestyle, Mamas&Papas and People; Storydata; Colpisa and Dataista",
    ],
    study: "Study",
    infographics: "Infographics",
    lifestyle: "Lifestyle",
    parenting: "Parenting",
    skillsTitle: "Tools I Use",
    languagesTitle: "Languages I Speak",
    cta: "Available for data and infographic projects, as well as lifestyle and maternity collaborations",
  },
};
