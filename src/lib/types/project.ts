import type { Block } from "$lib/content/parseProjectContent";

export type HomeZone =
  | "heroMain"
  | "heroSide"
  | "gridTop"
  | "features"
  | "listBlock"
  | "heroBottom"
  | "finalGrid";

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
// 📄 MD FIELDS
export type ProjectContentFields = {
  medium?: string;
  date?: string;
  tags?: string[];
  tools?: string[];

  // 👇 AÑADE ESTO
  focus?: string;
  type?: string;
};

// 🚀 FINAL PROJECT
export type Project = BaseProject &
  ProjectContentFields & {
    blocks: Block[];
  };
