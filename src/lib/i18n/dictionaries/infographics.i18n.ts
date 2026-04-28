import type { RichText } from "$lib/i18n/rich-text.types";

type InfographicsDict = {
  title: string;
  searchPlaceholder: string;

  sort: {
    newest: string;
    title: string;
    section: string;
    medium: string;
  };

  filters: {
    apartados: string;
    mediums: string;
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
      newest: "Más recientes",
      title: "A-Z",
      section: "Apartado",
      medium: "Medio",
    },

    filters: {
      apartados: "Apartados",
      mediums: "Medios",
    },

    apartados: {
      sports: "Deportes",
      environment: "Medio Ambiente",
      culture: "Cultura",
    },

    mediums: {
      elpais: "El País",
      elmundo: "El Mundo",
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
        text: "Durante los primeros meses aprendí a través de otros, pero desde entonces he aprendido prácticamente autodidacta",
      },
    ] satisfies RichText,
  },

  en: {
    title: "Infographics, data analysis and dataviz",
    searchPlaceholder: "Search...",

    sort: {
      newest: "Newest",
      title: "A-Z",
      section: "Section",
      medium: "Medium",
    },

    filters: {
      apartados: "Sections",
      mediums: "Media",
    },

    apartados: {
      sports: "Sports",
      environment: "Climate",
      culture: "Culture",
    },

    mediums: {
      elpais: "El País",
      elmundo: "El Mundo",
    },

    intro: [
      {
        text: "Welcome to the ",
      },
      {
        text: "infographics and data visualization section",
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
        text: ". For the first month I learned by others, but from then I have learn mainly by myself",
      },
    ] satisfies RichText,
  },
};
