import type { RoleType } from "$lib/types/project";

export const ROLE_MAP: Record<
  RoleType,
  { icon: string; es: string; en: string }
> = {
  graficos: { icon: "📊", es: "Gráficos", en: "Graphics" },
  texto: { icon: "✍️", es: "Texto", en: "Writing" },
  desarrollo: { icon: "💻", es: "Desarrollo", en: "Development" },
  datos: { icon: "📈", es: "Datos", en: "Data" }
} as const;