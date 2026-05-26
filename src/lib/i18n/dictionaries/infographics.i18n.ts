import type { RichText } from "$lib/i18n/rich-text.types";

type InfographicsDict = {
  title: string;
  searchPlaceholder: string;

  sort: {
    label: string;
    newest: string;
    title: string;
    section: string;
    medium: string;
  };

  filters: {
    apartados: string;
    mediums: string;
  };

  featured: {
    toggleShowAll: string;
    toggleFeaturedOnly: string;
  };

  insights: {
    totalWorks: string;
    works: string;
  };

  apartados: Record<string, string>;
  mediums: Record<string, string>;

  intro: RichText;
  description: RichText;
};

export const infographics: Record<"es" | "en", InfographicsDict> = {
  es: {
    title: "Infografía, análisis y visualización de datos",
    searchPlaceholder: "Buscar...",

    sort: {
      label: "Ordenar por",
      newest: "Más recientes",
      title: "A-Z",
      section: "Apartado",
      medium: "Medio",
    },

    filters: {
      apartados: "Apartados",
      mediums: "Medios",
    },

    featured: {
      toggleShowAll: "Ver todas",
      toggleFeaturedOnly: "Solo destacados",
    },

    insights: {
      totalWorks: "Trabajos en el portfolio",
      works: "trabajos",
    },

    apartados: {
      sports: "Deportes",
      culture: "Cultura",
      gender: "Género",
      environment: "Medio Ambiente",
      economy: "Economía",
      national: "Nacional",
      international: "Internacional",
      local: "Local",
      miscellaneous: "Miscelánea",
    },

    mediums: {
      elpais: "El País",
      colpisa: "Colpisa",
      sty_forbes: "Forbes (Storydata)",
      sty_construnews: "Construnews (Storydata)",
      sty_reuters: "Reuters (Storydata)",
      dataista: "Dataista",
    },

    intro: [
      {
        text: "Bienvenido/a a la sección de ",
      },
      {
        text: "infografía y periodismo de datos. ",
        bold: true,
      },
      {
        text: "Aquí puedes ver de manera más detenida mis principales trabajos.",
      },
    ],

    description: [
      {
        text: "Comencé a interesarme por el mundo de la infografía y el periodismo de datos en ",
      },
      {
        text: "marzo de 2022. ",
        bold: true,
      },
      {
        text: "Durante los primeros meses aprendí a través de otros, pero desde entonces he aprendido prácticamente autodidacta.",
      },
    ] satisfies RichText,
  },

  en: {
    title: "Infographics, data analysis and dataviz",
    searchPlaceholder: "Search...",

    sort: {
      label: "Sort by",
      newest: "Newest",
      title: "A-Z",
      section: "Section",
      medium: "Medium",
    },

    filters: {
      apartados: "Sections",
      mediums: "Media",
    },

    featured: {
      toggleShowAll: "Show all",
      toggleFeaturedOnly: "Featured only",
    },

    insights: {
      totalWorks: "Portfolio works",
      works: "works",
    },

    apartados: {
      sports: "Sports",
      culture: "Culture",
      gender: "Gender",
      environment: "Climate",
      economy: "Economy",
      national: "National",
      international: "World",
      local: "Local",
      miscellaneous: "Features",
    },

    mediums: {
      elpais: "El País",
      colpisa: "Colpisa",
      sty_forbes: "Forbes (Storydata)",
      sty_construnews: "Construnews (Storydata)",
      sty_reuters: "Reuters (Storydata)",
      dataista: "Dataista",
    },

    intro: [
      {
        text: "Welcome to the ",
      },
      {
        text: "infographics and data visualization section. ",
        bold: true,
      },
      {
        text: "Here you can take a closer look at my main works.",
      },
    ],

    description: [
      {
        text: "I first became interested in infographics and data journalism in ",
      },
      {
        text: "March 2022",
        bold: true,
      },
      {
        text: ". For the first month I learned by others, but from then I have learn mainly by myself.",
      },
    ] satisfies RichText,
  },
};
