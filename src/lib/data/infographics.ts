import projects from "$lib/data/projects";

/* =========================
   META
========================= */

export interface InfographicMeta {
  apartadoKey?: string;

  apartado?: {
    es: string;
    en: string;
  };

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

  medium?: {
    es: string;
    en: string;
  };

  url?: string;

  featured?: boolean;
}

/* =========================
   TIPO FINAL
========================= */

export type Infographic = {
  id: string;
  slug?: string;
  title: { es: string; en: string };
  description?: { es: string; en: string };
  image?: string;
  category: "infografia" | "estilo";
} & InfographicMeta;

/* =========================
   META IMPORT
========================= */

const metaModules = import.meta.glob(
  "/src/content/infografias/**/meta.json",
  {
    eager: true,
    import: "default",
  }
) as Record<string, InfographicMeta>;

/* =========================
   HELPERS
========================= */

const getMetaPath = (slug: string) =>
  `/src/content/infografias/${slug}/meta.json`;

/* =========================
   BUILD DATASET
========================= */

export const infographics: Infographic[] = projects
  .filter((p) => p.category === "infografia")
  .map((project) => {
    const meta = metaModules[getMetaPath(project.slug ?? "")] ?? {};

    return {
      ...project,
      ...meta,
    };
  });