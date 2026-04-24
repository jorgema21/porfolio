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

/**
 * 🔥 ESTE ES EL PROJECT REAL (contenido completo)
 */
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

