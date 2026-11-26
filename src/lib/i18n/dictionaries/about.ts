import type { RichText } from "#lib/i18n/rich-text.types.js";

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
  travel: string;
  skillsTitle: string;
  languagesTitle: string;
  cta: string;

  aria: {
    languagesSelector: string;
  };
};

export const about: Record<"es" | "en", AboutDict> = {
  es: {
    title: "Sobre mí",

    intro: [
      {
        text: "Soy periodista e infografista independiente, especializado en ",
      },
      {
        text: "visualización de datos, periodismo visual y contenidos de estilo de vida y maternidad y viajes.",
        bold: true,
      },
    ],

    focus: [
      {
        text: "Trabajo de manera independiente, tanto por mi cuenta como en equipo, y colaboro con medios de comunicación y marcas para crear ",
      },
      {
        text: "historias claras, rigurosas y de impacto. Me interesa explorar fenómenos sociales y temas de actualidad a través de los datos, ",
      },
      {
        text: "así como investigar cómo influye la psicología en la vida cotidiana, especialmente en el ámbito de la crianza y las familias. ",
      },
      {
        text: "También disfruto descubriendo lugares y contando las historias que hay detrás de ellos.",
      },
    ],

    timelineTitle: "Mi trayectoria",
    timelineDesc:
      "Desplázate para descubrir mi trayectoria, consulta el resumen o utiliza el botón inferior para ir directamente al final.",

    miniTimelineTitle: "Ver resumen rápido",
    miniTimeline: [
      "Periodismo en Valladolid (sep. 2017-jul. 2021)",
      "Erasmus en Bérgamo (sep. 2019-jul. 2020)",
      "Máster de El País (oct. 2021-sep. 2023)",
      "Beca en Narrativas Visuales (sep. 2022-sep. 2023)",
      "El País Deportes (feb. a abr. 2024)",
      "Autónomo (desde abr. 2024): Colaboraciones con Artículo 14; El País Estilo de Vida, Mamas&Papas, Gente y El Viajero; Storydata; Colpisa y Dataista",
    ],
    study: "Estudio",
    infographics: "Infografía",
    lifestyle: "Estilo de vida",
    parenting: "Maternidad",
    travel: "Viajes",
    skillsTitle: "Herramientas que uso",
    languagesTitle: "Idiomas que hablo",
    cta: "Disponible para proyectos de infografía y datos, así como para colaboraciones de estilo de vida, maternidad y viajes",
    aria: {
      languagesSelector: "Seleccionar idioma",
    },
  },

  en: {
    title: "About Me",

    intro: [
      {
        text: "I'm a freelance journalist and information designer specializing in ",
      },
      {
        text: "data visualization, visual journalism, and lifestyle, parenting and travel journalism.",
        bold: true,
      },
    ],

    focus: [
      {
        text: "I work independently and as part of a team, collaborating with media outlets and brands to create ",
      },
      {
        text: "clear, accurate, and compelling stories. I'm particularly interested in exploring social issues and current events through data, ",
      },
      {
        text: "as well as examining how psychology shapes everyday life, especially for parents and families. ",
      },
      {
        text: "I also enjoy discovering places and telling the stories behind them.",
      },
    ],

    timelineTitle: "My Career Journey",
    timelineDesc:
      "Scroll down to explore my career journey, check the summary, or use the button below to jump straight to the end.",

    miniTimelineTitle: "Quick Overview",
    miniTimeline: [
      "Journalism degree at the University of Valladolid (Sep 2017–Jul 2021)",
      "Erasmus exchange in Bergamo (Sep 2019–Jul 2020)",
      "Master's degree at El País (Oct 2021–Sep 2023)",
      "Visual Storytelling internship (Sep 2022–Sep 2023)",
      "El País Sports (Feb–Apr 2024)",
      "Freelance journalist and information designer (since Apr 2024): Collaborations with Artículo 14; El País Lifestyle, Mamas&Papas, Gente and El Viajero; Storydata; Colpisa; and Dataista",
    ],
    study: "Education",
    infographics: "Infographics",
    lifestyle: "Lifestyle",
    parenting: "Parenting",
    travel: "Travel",
    skillsTitle: "Tools I Use",
    languagesTitle: "Languages I Speak",
    cta: "Available for data visualization and information graphics projects, as well as lifestyle, parenting and travel journalism collaborations",
    aria: {
      languagesSelector: "Select language",
    },
  },
};
