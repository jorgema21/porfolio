import projects from "$lib/data/projects";
import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";

/* =========================
   TYPES
========================= */

export interface InfographicMeta {
  apartado?: ApartadoKey;

  mediumKey?: string;

  usos?: {
    es: string;
    en: string;
  }[];

  colaboracion?: {
    tipo: "solo" | "equipo";
    rol: string[];
  };

  tools?: string[];
  date?: string;

  url?: string;
  featured?: boolean;
}

export type Infographic = Omit<
  (typeof projects)[number],
  keyof InfographicMeta
> &
  InfographicMeta;

/* =========================
   META LOADERS
========================= */

const metaModules = import.meta.glob<InfographicMeta>(
  "/src/content/infografias/**/meta.json",
  {
    eager: true,
    import: "default"
  }
);

/* =========================
   NORMALIZE META BY SLUG
========================= */

const metaBySlug: Record<string, InfographicMeta> = {};

for (const path in metaModules) {
  const slug = path.split("/").slice(-2, -1)[0];
  metaBySlug[slug] = metaModules[path];
}

/* =========================
   DATASET FINAL
========================= */

export const infographics: Infographic[] = projects
  .filter(
    (p): p is typeof p & { slug: string } =>
      p.category === "infografia" && typeof p.slug === "string"
  )
  .map((project): Infographic => {
    const meta = metaBySlug[project.slug] ?? {};

    if (meta.apartado && !(meta.apartado in APARTADOS)) {
      throw new Error(`Apartado inválido: ${meta.apartado}`);
    }

    return {
      ...project,
      ...meta
    };
  });