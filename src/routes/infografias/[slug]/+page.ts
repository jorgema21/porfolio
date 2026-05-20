import projects from "$lib/data/projects";
import { error } from "@sveltejs/kit";
import type { Block } from "$lib/types/block";
import type {
  InfographicRuntime,
  InfographicMeta,
} from "$lib/types/project.types";
import type { PageLoad, EntryGenerator } from "./$types";

const contentModules = import.meta.glob(
  "/src/content/infografias/**/content.json",
  { import: "default" },
);

const metaModules = import.meta.glob("/src/content/infografias/**/meta.json", {
  import: "default",
});

export const load: PageLoad = async ({ params }) => {
  const base = projects.find((p) => p.slug === params.slug);
  if (!base || !base.slug) throw error(404, "Project not found");

  const contentPath = `/src/content/infografias/${params.slug}/content.json`;
  const metaPath = `/src/content/infografias/${params.slug}/meta.json`;

  const contentLoader = contentModules[contentPath];
  if (!contentLoader) throw error(404, "Content not found");

  const content = (await contentLoader()) as { blocks: Block[] };

  const metaRaw = metaModules[metaPath]
    ? await metaModules[metaPath]()
    : undefined;

  const meta: InfographicMeta = metaRaw ?? {};

  const medium =
    meta.mediumKey !== undefined
      ? {
          es: meta.mediumKey,
          en: meta.mediumKey,
        }
      : undefined;

  return {
    project: {
      ...base,
      ...meta,
      blocks: content.blocks,
      ...(medium ? { medium } : {}),
    } satisfies InfographicRuntime,
  };
};

export const entries: EntryGenerator = () => {
  return [
    { slug: "roland-garros-sin-nadal" },
    { slug: "adios-xavi" },
    { slug: "incendio-tenerife" },
  ];
};

export const prerender = true;
