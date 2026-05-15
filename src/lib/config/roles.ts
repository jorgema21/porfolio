import type { RoleType } from "$lib/types/project.types";

type RoleConfig = {
  icon: string;
  label: {
    es: string;
    en: string;
  };
};

export const ROLE_MAP = {
  graficos: {
    icon: "📊",

    label: {
      es: "Gráficos",
      en: "Graphics",
    },
  },

  texto: {
    icon: "✍️",

    label: {
      es: "Texto",
      en: "Writing",
    },
  },

  desarrollo: {
    icon: "💻",

    label: {
      es: "Desarrollo",
      en: "Development",
    },
  },

  datos: {
    icon: "📈",

    label: {
      es: "Datos",
      en: "Data",
    },
  },
} satisfies Record<RoleType, RoleConfig>;
