import projects from "$lib/data/projects";
import { APARTADOS } from "$lib/config/apartados.config";
import type { InfographicMeta } from "$lib/types/project.types";
export interface Infographic extends Record<string, unknown>, InfographicMeta {
  id: string;
  slug: string;
  category: string;
  title: {
    es: string;
    en: string;
  };
}

const metaModules = import.meta.glob<InfographicMeta>(
  "/src/content/infografias/**/meta.json",
  { eager: true, import: "default" },
);

const metaBySlug = Object.entries(metaModules).reduce<
  Record<string, InfographicMeta>
>((acc, [path, content]) => {
  const pathParts = path.split("/");
  const slug = pathParts[pathParts.length - 2];

  if (slug) {
    acc[slug] = content;
  }
  return acc;
}, {});

export const infographics: Infographic[] = projects
  .filter(
    (p): p is typeof p & { slug: string } =>
      p.category === "infografia" && typeof p.slug === "string",
  )
  .map((project): Infographic => {
    const meta = metaBySlug[project.slug];

    if (!meta) {
      console.warn(
        `[Portfolio Warning] No se encontraron metadatos locales para el slug: "${project.slug}"`,
      );
      return project as Infographic;
    }

    if (meta.apartado && !(meta.apartado in APARTADOS)) {
      throw new Error(
        `[Portfolio Error] El apartado "${meta.apartado}" asignado en el proyecto "${project.slug}" no está registrado en apartados.config.ts`,
      );
    }

    return {
      ...project,
      ...meta,
    } as Infographic;
  });
