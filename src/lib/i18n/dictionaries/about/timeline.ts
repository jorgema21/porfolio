import type { TimelineId } from "$lib/data/about/timeline.data";

export type TimelineLocale = Record<
  TimelineId,
  {
    title: string;
    description: string;
  }
>;

export type TimelineI18n = {
  es: TimelineLocale;
  en: TimelineLocale;
};

export const timeline = {
  es: {
    "journalism-degree": {
      title: "Grado en Periodismo",
      description:
        "Comencé la carrera de periodismo en la Universidad de Valladolid (España)",
    },

    "erasmus-year": {
      title: "Año Erasmus",
      description: "Hice un curso internacional en Bérgamo (Italia)",
    },

    "end-degree": {
      title: "Final de carrera",
      description:
        "Terminé el grado universitario sin cursar infografía ni periodismo de datos",
    },

    "start-ep": {
      title: "Inicio máster de El País",
      description: "Comencé el año teórico de los dos cursos de duración.",
    },

    "start-internship": {
      title: "Beca en Narrativas Visuales",
      description:
        "Estuve un año como becario en El País y aprendí infografía y datos casi desde cero",
    },

    "end-internship": {
      title: "Final de máster",
      description:
        "Terminé la beca y me centré en aprender infografía y datos por mi cuenta unos meses",
    },

    "sports-ep": {
      title: "Baja en El País Deportes",
      description:
        "Durante dos meses realicé directos en web, edité textos y escribí temas de datos",
    },

    "start-freelance": {
      title: "Inicio como autónomo",
      description:
        "Comencé por mi cuenta y entre a colaborar como infografista de Artículo 14",
    },

    "end-a14": {
      title: "Fin colaboración Artículo 14",
      description:
        "Dejé de colaborar con el periódico y estudié ampliar horizontes laborales",
    },

    "start-lifestyle": {
      title: "Colaboración con la sección Estilo de Vida de El País",
      description:
        "Empecé a escribir en la sección y me centré en temas de psicología cotidiana",
    },

    "start-parenting": {
      title: "Colaboración con la sección Mamas&Papas de El País",
      description:
        "Comencé a hacer temas de maternidad con el foco en psicología materna e infantil",
    },

    "start-sty": {
      title: "Colaboración con Storydata",
      description:
        "Inicié una colaboración con Storydata para temas de infografía y datos de papel y web",
    },

    "start-col": {
      title: "Colaboración con Colpisa",
      description:
        "También comencé una colaboración con Colpisa de infografía, análisis y visualización de datos para temas web trabajados",
    },

    "start-epgente": {
      title: "Colaboración con la sección Gente de El País",
      description:
        "Empecé a escribir perfiles de famosos internacionales de cultura que eran noticia",
    },

    "start-dataista": {
      title: "Colaboración con Dataista",
      description:
        "Trabajé en un proyecto en el que aprendí más a fondo desarrollo web",
    },

    "this-portfolio": {
      title: "¡Este porfolio!",
      description:
        "Desarrollé durante meses un porfolio como un proyecto en sí mismo en el que mostrar mis trabajos más importantes de un modo visual y ameno",
    },
  },

  en: {
    "journalism-degree": {
      title: "Journalism degree",
      description:
        "I started my journalism degree at the University of Valladolid (Spain)",
    },

    "erasmus-year": {
      title: "Erasmus year",
      description: "I completed an international course in Bergamo (Italy)",
    },

    "end-degree": {
      title: "End of degree",
      description:
        "I graduated university without taking graphics or data journalism classes",
    },

    "start-ep": {
      title: "Started a master's program with El País",
      description:
        "I completed the first theoretical year of a two-year program",
    },

    "start-internship": {
      title: "Visual Storytelling internship",
      description:
        "I did a one-year internship at El País newspaper, learning graphics and data from scratch",
    },

    "end-internship": {
      title: "Completed my master's degree",
      description:
        "After my internship, I spent a few months self-teaching graphics and data journalism",
    },

    "sports-ep": {
      title: "Covered a temporary leave in the El País Sports section",
      description:
        "For two months, I managed live web coverage, edited copy, and wrote data-driven stories.",
    },

    "start-freelance": {
      title: "Launched my freelance career",
      description:
        "Started working independently and began collaborating as an infographer for Artículo 14",
    },

    "end-a14": {
      title: "Ended collaboration with Artículo 14",
      description:
        "Stopped collaborating with the newspaper to focus on expanding my career horizons",
    },

    "start-lifestyle": {
      title: "Collaboration with El País Lifestyle section",
      description:
        "Started writing for the section, focusing on everyday psychology.",
    },

    "start-parenting": {
      title: "Collaboration with El País Mamas&Papas section",
      description:
        "Began covering parenting topics, with a focus on maternal and child psychology",
    },

    "start-sty": {
      title: "Collaboration with Storydata",
      description:
        "Started collaborating with Storydata on print and web graphics and data projects.",
    },

    "start-col": {
      title: "Collaboration with Colpisa",
      description:
        "Began collaborating with Colpisa specializing in web-based graphics, data analysis, and visualization.",
    },

    "start-epgente": {
      title: "Collaboration with El País People section",
      description:
        "Started writing profiles on trending international cultural figures",
    },

    "start-dataista": {
      title: "Colaboración Dataista",
      description:
        "Worked on a project where I gained a deeper understanding of web development",
    },

    "this-portfolio": {
      title: "This portfolio!",
      description:
        "Spent months developing my portfolio as a standalone project to showcase my best work in a visual, engaging way",
    },
  },
} satisfies TimelineI18n;
