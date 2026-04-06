import type { Block } from "$lib/content/parseProjectContent";

export type HomeZone =
  | "heroMain"
  | "heroSide"
  | "gridTop"
  | "features"
  | "listBlock"
  | "heroBottom"
  | "finalGrid";

export type RoleType = "graficos" | "texto" | "desarrollo" | "datos";

export interface ProjectTitle {
  es: string;
  en: string;
}

// 🧱 BASE PROJECT (HOME)
export interface BaseProject {
  id: string;

  title: ProjectTitle;

  description?: {
    es: string;
    en: string;
  };

  image?: string;

  category: "infografia" | "estilo";

  homeZone?: HomeZone;
  homeOrder?: number;
  homeVisible?: boolean;

  slug?: string;
  externalUrl?: string;
}

// 📄 MD FIELDS
export type ProjectContentFields = {
  medium?: string;
  date?: string;

  apartado?: string;
  usos?: string[];

  colaboracion?: {
    tipo: "solo" | "equipo";
    rol: RoleType[];
  };

  tools?: string[];
  url?: string;
};

// 🚀 FINAL PROJECT
export type Project = BaseProject &
  ProjectContentFields & {
    blocks: Block[];
  };