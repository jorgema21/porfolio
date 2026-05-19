import type { RoleType } from "$lib/types/project.types";

type RoleConfig = {
  readonly icon: string;
  readonly label: {
    readonly es: string;
    readonly en: string;
  };
};

export const ROLE_MAP = {
  graficos: { icon: "📊", label: { es: "Gráficos", en: "Graphics" } },
  texto: { icon: "✍️", label: { es: "Texto", en: "Writing" } },
  desarrollo: { icon: "💻", label: { es: "Desarrollo", en: "Development" } },
  datos: { icon: "📈", label: { es: "Datos", en: "Data" } },
} as const satisfies Record<RoleType, RoleConfig>;
