import type { LanguageId } from "$lib/data/about/languages.data";

type LanguageContent = {
  name: string;
  levelLabel: string;
};

export type LanguageLocale = Record<LanguageId, LanguageContent> & {
  scale: {
    beginner: string;
    professional: string;
  };
};

export type LanguagesI18n = {
  es: LanguageLocale;
  en: LanguageLocale;
};

export const languages = {
  es: {
    spanish: {
      name: "Español",
      levelLabel: "Nativo",
    },

    english: {
      name: "Inglés",
      levelLabel: "B2",
    },

    italian: {
      name: "Italiano",
      levelLabel: "Intermedio",
    },

    french: {
      name: "Francés",
      levelLabel: "Básico",
    },

    catalan: {
      name: "Catalán",
      levelLabel: "Básico",
    },

    scale: {
      beginner: "Principiante",
      professional: "Profesional",
    },
  },

  en: {
    spanish: {
      name: "Spanish",
      levelLabel: "Native",
    },

    english: {
      name: "English",
      levelLabel: "B2",
    },

    italian: {
      name: "Italian",
      levelLabel: "Intermediate",
    },

    french: {
      name: "French",
      levelLabel: "Basic",
    },

    catalan: {
      name: "Catalan",
      levelLabel: "Basic",
    },

    scale: {
      beginner: "Beginner",
      professional: "Professional",
    },
  },
} satisfies LanguagesI18n;
