export const APARTADOS = {
  sports: {
    label: {
      es: "Deportes",
      en: "Sports"
    },
    color: {
      light: "oklch(55% 0.22 25)",
      dark: "oklch(70% 0.2 25)"
    },
    order: 1
  },

  culture: {
    label: {
      es: "Cultura",
      en: "Culture"
    },
    color: {
      light: "oklch(60% 0.18 310)",
      dark: "oklch(75% 0.16 310)"
    },
    order: 2
  },

  genero: {
    label: {
      es: "Género",
      en: "Gender"
    },
    color: {
      light: "oklch(65% 0.18 340)",
      dark: "oklch(78% 0.16 340)"
    },
    order: 3
  },

  environment: {
    label: {
      es: "Medio Ambiente",
      en: "Environment"
    },
    color: {
      light: "oklch(55% 0.18 145)",
      dark: "oklch(70% 0.16 145)"
    },
    order: 4
  },

  economia: {
    label: {
      es: "Economía",
      en: "Economy"
    },
    color: {
      light: "oklch(60% 0.15 85)",
      dark: "oklch(75% 0.14 85)"
    },
    order: 5
  },

  nacional: {
    label: {
      es: "Nacional",
      en: "National"
    },
    color: {
      light: "oklch(55% 0.18 250)",
      dark: "oklch(70% 0.16 250)"
    },
    order: 6
  },

  internacional: {
    label: {
      es: "Internacional",
      en: "International"
    },
    color: {
      light: "oklch(55% 0.08 180)",
      dark: "oklch(70% 0.1 180)"
    },
    order: 7
  }
} as const;

export type ApartadoKey = keyof typeof APARTADOS;