import type { TimelineId } from "$lib/data/timeline.data";

/**
 * Contenido traducido de un idioma
 */
export type TimelineLocale = Record<
  TimelineId,
  {
    title: string;
    description: string;
  }
>;

/**
 * Contenedor multidioma
 */
export type TimelineI18n = {
  es: TimelineLocale;
  en: TimelineLocale;
};

export const timeline = {
  es: {
    "journalism-degree": {
      title: "Grado en Periodismo",
      description:
        "Inicio de la carrera y primeros proyectos narrativos.",
    },

    "student-media": {
      title: "Medios universitarios",
      description:
        "Participación en proyectos de redacción, entrevistas y reportajes.",
    },

    "data-discovery": {
      title: "Descubrimiento del periodismo de datos",
      description:
        "Primer contacto con visualización, hojas de cálculo y gráficos.",
    },

    "visual-storytelling": {
      title: "Narrativa visual",
      description:
        "Desarrollo de piezas donde diseño y texto trabajan conjuntamente.",
    },

    "editorial-design": {
      title: "Diseño editorial",
      description:
        "Aprendizaje de composición visual, jerarquía y ritmo gráfico.",
    },

    "visual-narratives": {
      title: "Narrativas Visuales",
      description:
        "Especialización intensiva en infografía y datos.",
    },

    "interactive-graphics": {
      title: "Visualizaciones interactivas",
      description:
        "Creación de proyectos digitales con enfoque scrollytelling.",
    },

    "frontend-learning": {
      title: "Aprendizaje frontend",
      description:
        "HTML, CSS y JavaScript orientado a visualización.",
    },

    "svelte-start": {
      title: "Primeros proyectos con Svelte",
      description:
        "Componentes interactivos y reutilizables para visualización.",
    },

    "portfolio-redesign": {
      title: "Rediseño del portfolio",
      description:
        "Nueva arquitectura visual centrada en narrativa.",
    },

    "lifestyle-writing": {
      title: "Contenido lifestyle",
      description:
        "Proyectos de maternidad y estilo de vida.",
    },

    "data-visual-specialization": {
      title: "Especialización en visualización de datos",
      description:
        "Profundización en gráficos interactivos y scrollytelling.",
    },
  },

  en: {
    "journalism-degree": {
      title: "Journalism Degree",
      description:
        "Beginning of the degree and first storytelling projects.",
    },

    "student-media": {
      title: "University media",
      description:
        "Participation in editorial, interviews and reporting projects.",
    },

    "data-discovery": {
      title: "Data journalism discovery",
      description:
        "First contact with visualization, spreadsheets and charts.",
    },

    "visual-storytelling": {
      title: "Visual storytelling",
      description:
        "Design and text working together in narrative pieces.",
    },

    "editorial-design": {
      title: "Editorial design",
      description:
        "Learning visual hierarchy, layout and rhythm.",
    },

    "visual-narratives": {
      title: "Visual narratives",
      description:
        "Intensive specialization in infographics and data.",
    },

    "interactive-graphics": {
      title: "Interactive graphics",
      description:
        "Digital projects focused on scrollytelling.",
    },

    "frontend-learning": {
      title: "Frontend learning",
      description:
        "HTML, CSS and JavaScript applied to visualization.",
    },

    "svelte-start": {
      title: "First projects with Svelte",
      description:
        "Reusable interactive components for data visualization.",
    },

    "portfolio-redesign": {
      title: "Portfolio redesign",
      description:
        "New narrative-driven visual architecture.",
    },

    "lifestyle-writing": {
      title: "Lifestyle content",
      description:
        "Motherhood and lifestyle-related projects.",
    },

    "data-visual-specialization": {
      title: "Data visualization specialization",
      description:
        "Advanced scrollytelling and interactive graphics.",
    },
  },
} satisfies TimelineI18n;