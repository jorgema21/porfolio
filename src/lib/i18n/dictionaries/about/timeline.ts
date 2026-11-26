import type { TimelineId } from "#lib/data/about/timeline.data.js";

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
        "Comencé el grado en Periodismo en la Universidad de Valladolid (España).",
    },

    "erasmus-year": {
      title: "Año Erasmus",
      description:
        "Cursé un año académico de intercambio Erasmus en Bérgamo (Italia).",
    },

    "end-degree": {
      title: "Final de carrera",
      description:
        "Terminé el grado sin haber cursado asignaturas de infografía ni periodismo de datos.",
    },

    "start-ep": {
      title: "Inicio máster de El País",
      description:
        "Comencé el primer año, de formación teórica, del máster de El País.",
    },

    "start-internship": {
      title: "Beca en Narrativas Visuales",
      description:
        "Realicé un año de prácticas en El País, donde aprendí infografía y periodismo de datos prácticamente desde cero.",
    },

    "end-internship": {
      title: "Final de máster",
      description:
        "Finalicé las prácticas y dediqué varios meses a seguir formándome por mi cuenta en infografía y periodismo de datos.",
    },

    "sports-ep": {
      title: "Sustitución temporal en El País Deportes",
      description:
        "Durante dos meses trabajé en coberturas en directo para la web, edité artículos y redacté reportajes de datos.",
    },

    "start-freelance": {
      title: "Inicio como autónomo",
      description:
        "Comencé mi trayectoria como autónomo y empecé a colaborar con Artículo 14 como infografista.",
    },

    "end-a14": {
      title: "Fin colaboración Artículo 14",
      description:
        "Finalicé mi colaboración con el periódico y exploré nuevas oportunidades profesionales.",
    },

    "start-lifestyle": {
      title: "Colaboración con la sección Estilo de Vida de El País",
      description:
        "Comencé a escribir para la sección de Estilo de Vida de El País, centrándome en temas de psicología cotidiana.",
    },

    "start-parenting": {
      title: "Colaboración con la sección Mamas&Papas de El País",
      description:
        "Empecé a escribir sobre maternidad y crianza, con especial atención a la psicología materna e infantil.",
    },

    "start-sty": {
      title: "Colaboración con Storydata",
      description:
        "Inicié una colaboración con Storydata para desarrollar proyectos de infografía y periodismo de datos destinados a medios impresos y digitales.",
    },

    "start-col": {
      title: "Colaboración con Colpisa",
      description:
        "Comencé a colaborar con Colpisa en la elaboración de reportajes digitales que combinan infografía, análisis y visualización de datos.",
    },

    "start-epgente": {
      title: "Colaboración con la sección Gente de El País",
      description:
        "Empecé a escribir perfiles de personalidades internacionales del ámbito cultural y del entretenimiento que eran noticia.",
    },

    "start-dataista": {
      title: "Colaboración con Dataista",
      description:
        "Participé en un proyecto con Dataista que me permitió profundizar en mis conocimientos de desarrollo web.",
    },

    "this-portfolio": {
      title: "¡Este porfolio!",
      description:
        "Dediqué varios meses a desarrollar este porfolio como un proyecto en sí mismo, con el objetivo de presentar mis trabajos más destacados de una forma visual y atractiva.",
    },

    "start-travel": {
      title: "Colaboración con El Viajero de El País",
      description:
        "Comencé a publicar reportajes sobre destinos y experiencias de viaje.",
    },
  },

  en: {
    "journalism-degree": {
      title: "Started My Journalism Degree",
      description:
        "I began studying journalism at the University of Valladolid in Spain.",
    },

    "erasmus-year": {
      title: "Erasmus Exchange",
      description: "I spent an academic year studying in Bergamo, Italy.",
    },

    "end-degree": {
      title: "Completed My Journalism Degree",
      description:
        "I graduated without having studied information graphics or data journalism as part of my degree.",
    },

    "start-ep": {
      title: "Started the El País Master's Program",
      description:
        "I began the first year of the El País master's program, focused on classroom-based learning.",
    },

    "start-internship": {
      title: "Visual Storytelling Internship",
      description:
        "I spent a year as an intern at El País, learning information graphics and data journalism almost from scratch.",
    },

    "end-internship": {
      title: "Completed My Master's Degree",
      description:
        "After finishing my internship, I spent several months developing my information graphics and data journalism skills independently.",
    },

    "sports-ep": {
      title: "Temporary Assignment at El País Sports",
      description:
        "For two months, I worked on live online coverage, edited articles, and wrote data-driven stories.",
    },

    "start-freelance": {
      title: "Began My Freelance Career",
      description:
        "I started working independently and began collaborating with Artículo 14 as an information designer.",
    },

    "end-a14": {
      title: "End of My Collaboration with Artículo 14",
      description:
        "I ended my collaboration with the newspaper and explored new professional opportunities.",
    },

    "start-lifestyle": {
      title: "Started Writing for El País's Lifestyle Section",
      description:
        "I began writing for El País's lifestyle section, focusing on everyday psychology.",
    },

    "start-parenting": {
      title: "Started Writing for El País's Mamas&Papas Section",
      description:
        "I began writing about motherhood and parenting, with a particular focus on maternal and child psychology.",
    },

    "start-sty": {
      title: "Collaboration with Storydata",
      description:
        "I began collaborating with Storydata on information graphics and data journalism projects for print and digital publications.",
    },

    "start-col": {
      title: "Collaboration with Colpisa",
      description:
        "I began collaborating with Colpisa on in-depth digital stories involving information graphics, data analysis, and visualization.",
    },

    "start-epgente": {
      title: "Started Writing for El País's Gente Section",
      description:
        "I began writing profiles of international figures in culture and entertainment who were making headlines.",
    },

    "start-dataista": {
      title: "Collaboration with Dataista",
      description:
        "I worked on a project that helped me deepen my web development skills.",
    },

    "this-portfolio": {
      title: "This Portfolio!",
      description:
        "I spent several months building this portfolio as a project in its own right, creating a visual and engaging way to showcase my most important work.",
    },

    "start-travel": {
      title: "Started Writing for El Viajero at El País",
      description:
        "I began writing travel features about destinations and travel experiences.",
    },
  },
} satisfies TimelineI18n;
