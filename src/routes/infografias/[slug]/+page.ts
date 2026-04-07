import projects from "$lib/data/projects";
import { error } from "@sveltejs/kit";
import type { Project, ProjectContentFields } from "$lib/types/project";

// 📦 CONTENT (JSON)
const contentModules = import.meta.glob(
  "/src/content/infografias/**/content.json",
  { import: "default" },
);

// 🧾 META
const metaModules = import.meta.glob("/src/content/infografias/**/meta.json", {
  import: "default",
});

export async function load({ params }) {
  const slug = params.slug;

  const base = projects.find((p) => p.slug === slug);
  if (!base) throw error(404);

  // 📦 cargar content.json
  const contentLoader =
    contentModules[`/src/content/infografias/${slug}/content.json`];

  if (!contentLoader) throw error(404);

  const content = (await contentLoader()) as {
    blocks: Project["blocks"];
  };

  // 🧾 cargar meta
  const metaLoader = metaModules[`/src/content/infografias/${slug}/meta.json`];

  const meta = metaLoader ? ((await metaLoader()) as ProjectContentFields) : {};

  return {
    project: {
      ...base,
      ...meta,
      blocks: content.blocks, // ✅ DIRECTO, sin parser
    } satisfies Project,
  };
}
