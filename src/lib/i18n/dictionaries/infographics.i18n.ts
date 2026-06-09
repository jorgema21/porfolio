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
      github: "GitHub",
      linkedin: "LinkedIn",
      a14: "Artículo 14",
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
        text: "Mi interés por el mundo de la infografía y el periodismo de datos despertó en ",
      },
      {
        text: "marzo de 2022. ",
        bold: true,
      },
      {
        text: "En septiembre de ese año comencé una ",
      },
      {
        text: "beca en Narrativas Visuales del periódico El País ",
        bold: true,
      },
      {
        text: "donde aprendí las bases del periodismo visual y de datos, aunque los meses y años posteriores continué mi formación ",
      },
      {
        text: "de manera prácticamente autodidacta en diferentes medios y empresas como autónomo.",
        bold: true,
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
      github: "GitHub",
      linkedin: "LinkedIn",
      a14: "Artículo 14",
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
        text: "My interest in the world of infographics and data journalism awoke in ",
      },
      {
        text: "March 2022. ",
        bold: true,
      },
      {
        text: "That September, I started an ",
      },
      {
        text: "internship at Visual Storytelling section of El País newspaper ",
        bold: true,
      },
      {
        text: "where I learned the fundamentals of visual and data journalism, though in the following months and years I continued my training ",
      },
      {
        text: "practically on my own at different media and companies as a freelance.",
        bold: true,
      },
    ] satisfies RichText,
  },
};
