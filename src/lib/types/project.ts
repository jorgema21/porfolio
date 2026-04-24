import type { Block } from "$lib/types/block";
import type { ApartadoKey } from "$lib/config/apartados.config";

export type HomeZone =
  | "heroMain"
  | "heroSide"
  | "gridTop"
  | "features"
  | "listBlock"
  | "heroBottom"
  | "finalGrid";

export type Lang = "es" | "en";

export type TranslatedText = {
  es: string;
  en: string;
};

export type ColaboracionTipo = "solo" | "equipo";

export type RoleType = "graficos" | "texto" | "desarrollo" | "datos";

export interface BaseProject {
  id: string;
  title: TranslatedText;
  description?: TranslatedText;
  image?: string;

  category: "infografia" | "estilo";

  homeZone?: HomeZone;
  homeOrder?: number;
  homeVisible?: boolean;

  slug?: string;
  externalUrl?: string;
}

export type ProjectContentFields = {
  medium?: TranslatedText;
  date?: string;

  // ÚNICA FUENTE
  apartado?: ApartadoKey;

  usos?: TranslatedText[];

  colaboracion?: {
    tipo: ColaboracionTipo;
    rol: string[];
  };

  tools?: string[];
  url?: string;
};

export type Project = BaseProject &
  ProjectContentFields & {
    blocks: Block[];
  };
