import projects from "$lib/data/projects";
import { error } from "@sveltejs/kit";
import { parseProjectContent } from "$lib/content/parseProjectContent";
import type { Project, ProjectContentFields } from "$lib/types/project";

// 📄 MD
const mdModules = import.meta.glob(
  "/src/content/infografias/**/content.md",
  { query: "?raw", import: "default" }
);

// 🧾 META
const metaModules = import.meta.glob(
  "/src/content/infografias/**/meta.json",
  { import: "default" }
);

export async function load({ params }) {
  const slug = params.slug;

  const base = projects.find((p) => p.slug === slug);
  if (!base) throw error(404);

  const mdLoader =
    mdModules[`/src/content/infografias/${slug}/content.md`];
  if (!mdLoader) throw error(404);

  const metaLoader =
    metaModules[`/src/content/infografias/${slug}/meta.json`];

  const raw = (await mdLoader()) as string;

  const meta = metaLoader
    ? ((await metaLoader()) as ProjectContentFields)
    : {};

  return {
    project: {
      ...base,
      ...meta,
      blocks: parseProjectContent(raw),
    } satisfies Project,
  };
}