import projects from "$lib/data/projects";
import { error } from "@sveltejs/kit";
import type { Project } from "$lib/types/project";
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
  const { slug } = params;

  const base = projects.find((p) => p.slug === slug);
  if (!base) throw error(404, "Project not found");

  const contentLoader =
    contentModules[`/src/content/infografias/${slug}/content.json`];

  if (!contentLoader) throw error(404, "Content not found");

  const content = (await contentLoader()) as {
    blocks: Project["blocks"];
  };

  const metaLoader =
    metaModules[`/src/content/infografias/${slug}/meta.json`];

  const meta = metaLoader ? await metaLoader() : {};

  return {
    project: {
      ...base,
      ...meta,
      blocks: content.blocks
    } satisfies Project
  };
}