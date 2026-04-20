import projects from "$lib/data/projects";

/* =========================
   META TYPE (SOLO KEYS)
========================= */

export interface InfographicMeta {
  apartadoKey?: string;
  mediumKey?: string;

  usos?: {
    es: string;
    en: string;
  }[];

  colaboracion?: {
    tipo: "solo" | "equipo" | string;
    rol: string[];
  };

  tools?: string[];
  date?: string;

  url?: string;
  featured?: boolean;
}

/* =========================
   FINAL TYPE
========================= */

export type Infographic = (typeof projects)[number] &
  InfographicMeta;

/* =========================
   META IMPORTS
========================= */

const metaModules = import.meta.glob<Record<string, InfographicMeta>>(
  "/src/content/infografias/**/meta.json",
  {
    eager: true,
    import: "default",
  },
);

const getMetaPath = (slug: string) =>
  `/src/content/infografias/${slug}/meta.json`;

/* =========================
   BUILD DATASET
========================= */

export const infographics: Infographic[] = projects
  .filter(
    (p): p is typeof p & { slug: string } =>
      p.category === "infografia" && typeof p.slug === "string",
  )
  .map((project) => {
    const meta = metaModules[getMetaPath(project.slug)] ?? {};

    return {
      ...project,
      ...meta,
    };
  });