import type { Block } from "./block";
import type { ApartadoKey } from "$lib/config/apartados.config";

export type Lang = "es" | "en";
export type TranslatedText = Record<Lang, string>;
export type ProjectCategory = "infografia" | "estilo_de_vida" | "maternidad";
export type ProjectVariant = "hero" | "grid" | "list" | "feature";
export type ColaboracionTipo = "solo" | "equipo";
export type RoleType = "graficos" | "texto" | "desarrollo" | "datos";
export interface ProjectContent {
  id: string;
  title: TranslatedText;
  description?: TranslatedText;
  image?: string;
  category: ProjectCategory;
  variant?: ProjectVariant;
  
  colStart?: number;
  colSpan?: number;
  rowStart?: number;
  rowSpan?: number;
  
  homeVisible?: boolean;
  slug?: string;
  externalUrl?: string;
  mediumStyle?: string;
}

export interface InfographicMeta {
  apartado?: ApartadoKey;
  mediumKey?: string;
  usos?: TranslatedText[];
  colaboracion?: {
    tipo: ColaboracionTipo;
    rol: string[];
  };
  tools?: string[];
  date?: string;
  url?: string;
  featured?: boolean;
}

export type InfographicRuntime = ProjectContent & InfographicMeta & {
  blocks: Block[];
};
