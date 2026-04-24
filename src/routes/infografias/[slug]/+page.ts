import projects from "$lib/data/projects";
import { error } from "@sveltejs/kit";
import type { ProjectContent } from "$lib/types/project.types";
import type { InfographicMeta } from "$lib/data/infographics.data";

const contentModules = import.meta.glob(
  "/src/content/infografias/**/content.json",
  { import: "default" }
);

const metaModules = import.meta.glob<InfographicMeta>(
  "/src/content/infografias/**/meta.json",
  { import: "default" }
);

export async function load({ params }) {
  const base = projects.find((p) => p.slug === params.slug);
  if (!base) throw error(404, "Project not found");

  const contentPath = `/src/content/infografias/${params.slug}/content.json`;
  const metaPath = `/src/content/infografias/${params.slug}/meta.json`;

  const contentLoader = contentModules[contentPath];
  if (!contentLoader) throw error(404, "Content not found");

  const content = (await contentLoader()) as Pick<ProjectContent, "blocks">;
  const meta = metaModules[metaPath] ? await metaModules[metaPath]() : {};

  return {
    project: {
      ...base,
      ...meta,
      blocks: content.blocks
    } satisfies ProjectContent
  };
}