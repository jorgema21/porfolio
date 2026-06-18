import projects from "$lib/data/projects";

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
  "/src/content/graphics/**/meta.json",
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

    return {
      ...project,
      ...meta,
    } as Infographic;
  });
