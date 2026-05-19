import projects from "$lib/data/projects";
import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";

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

const metaModules = import.meta.glob<InfographicMeta>(
  "/src/content/infografias/**/meta.json",
  {
    eager: true,
    import: "default",
  },
);

const metaBySlug: Record<string, InfographicMeta> = {};

const slugRegex = /\/infografias\/([^/]+)\/meta\.json$/;

for (const path in metaModules) {
  const match = path.match(slugRegex);
  if (match) {
    metaBySlug[match[1]] = metaModules[path];
  }
}

export const infographics: Infographic[] = projects
  .filter(
    (p): p is typeof p & { slug: string } =>
      p.category === "infografia" && typeof p.slug === "string",
  )
  .map((project): Infographic => {
    const meta = metaBySlug[project.slug];

    if (!meta) {
      return project as Infographic;
    }

    if (meta.apartado && !(meta.apartado in APARTADOS)) {
      throw new Error(
        `[Portfolio Error] El apartado "${meta.apartado}" en el proyecto "${project.slug}" no existe en apartados.config.ts`,
      );
    }

    return {
      ...project,
      ...meta,
    };
  });
