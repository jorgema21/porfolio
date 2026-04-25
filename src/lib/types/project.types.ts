import type { Block } from "$lib/types/block";
import type { ApartadoKey } from "$lib/config/apartados.config";

export type Lang = "es" | "en";

export type TranslatedText = Record<Lang, string>;

export type HomeZone =
  | "heroMain"
  | "heroSide"
  | "gridTop"
  | "features"
  | "listBlock"
  | "heroBottom"
  | "finalGrid";

export type ProjectCategory = "infografia" | "estilo";

export type ColaboracionTipo = "solo" | "equipo";

export type RoleType =
  | "graficos"
  | "texto"
  | "desarrollo"
  | "datos";

/* =========================
   BASE PROJECT (CORE MODEL)
========================= */

export interface ProjectContent {
  id: string;

  title: TranslatedText;
  description?: TranslatedText;
  image?: string;

  category: ProjectCategory;

  slug?: string;
  externalUrl?: string;

  homeZone?: HomeZone;
  homeOrder?: number;
  homeVisible?: boolean;

  medium?: TranslatedText;
  date?: string;
  apartado?: ApartadoKey;

  usos?: TranslatedText[];

  colaboracion?: {
    tipo: ColaboracionTipo;
    rol: string[];
  };

  tools?: string[];
  url?: string;

  blocks: Block[];
}

/* =========================
   DERIVED TYPES (IMPORTANT)
========================= */

/**
 * Tipo específico para infografías
 * (derivado del modelo base)
 */
export type Infographic = ProjectContent & {
  category: "infografia";
};