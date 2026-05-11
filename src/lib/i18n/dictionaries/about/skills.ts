import type { SkillId } from "$lib/data/skills.data";

export type SkillLocale = Record<
  SkillId,
  {
    name: string;
    description: string;
    details: string[];
  }
>;

export type SkillsI18n = {
  es: SkillLocale;
  en: SkillLocale;
};

export const skills = {
  es: {
    datawrapper: {
      name: "Datawrapper",
      description:
        "Herramienta clave para visualización rápida en medios digitales.",
      details: [
        "Gráficos interactivos",
        "Mapas sencillos",
        "Publicación en entornos editoriales reales",
      ],
    },
    qgis: {
      name: "QGIS",
      description: "Análisis y visualización de datos geográficos.",
      details: ["Mapas temáticos", "Procesamiento de datos espaciales"],
    },
    svelte: {
      name: "Svelte",
      description:
        "Construcción de interfaces reactivas y componentes de visualización.",
      details: ["Componentes reutilizables", "UI reactiva", "Scrollytelling"],
    },
    code: {
      name: "Código",
      description: "Base sólida para diseño editorial en web.",
      details: ["Layouts responsivos", "Design systems", "Animaciones CSS"],
    },
    flourish: {
      name: "Flourish",
      description: "Gráficos avanzados no-code",
      details: ["Manipulación de datos", "Interacción UI", "APIs"],
    },
  },

  en: {
    datawrapper: {
      name: "Datawrapper",
      description:
        "Key tool for fast data visualization in editorial environments.",
      details: [
        "Interactive charts",
        "Simple maps",
        "Real-world editorial publishing",
      ],
    },
    qgis: {
      name: "QGIS",
      description: "Geospatial data analysis and visualization.",
      details: ["Thematic maps", "Spatial data processing"],
    },
    svelte: {
      name: "Svelte",
      description: "Building reactive interfaces and visualization components.",
      details: ["Reusable components", "Reactive UI", "Scrollytelling"],
    },
    code: {
      name: "Code",
      description: "Strong foundation for editorial web design.",
      details: ["Responsive layouts", "Design systems", "CSS animations"],
    },
    flourish: {
      name: "Flourish",
      description: "Advanced plots no-code",
      details: ["Data manipulation", "UI interaction", "APIs"],
    },
  },
} satisfies SkillsI18n;