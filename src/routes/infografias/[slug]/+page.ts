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

const findModuleBySlug = (
  modules: Record<string, () => Promise<unknown>>,
  slug: string,
) => {
  const match = Object.keys(modules).find((path) => {
    const parts = path.split("/");
    return parts[parts.length - 2] === slug;
  });
  return match ? modules[match] : undefined;
};

export const load: PageLoad = async ({ params }) => {
  const base = projects.find((p) => p.slug === params.slug);
  if (!base || !base.slug)
    throw error(
      404,
      `Proyecto "${params.slug}" no encontrado en el registro central.`,
    );

  const contentLoader = findModuleBySlug(contentModules, params.slug);
  if (!contentLoader)
    throw error(
      404,
      `Archivo 'content.json' no encontrado para el slug: "${params.slug}"`,
    );

  const metaLoader = findModuleBySlug(metaModules, params.slug);

  const [contentRaw, metaRaw] = await Promise.all([
    contentLoader() as Promise<{ blocks: Block[] }>,
    metaLoader
      ? (metaLoader() as Promise<InfographicMeta>)
      : Promise.resolve(undefined),
  ]);

  const meta: InfographicMeta = metaRaw ?? {};

  const medium =
    meta.mediumKey !== undefined
      ? { es: meta.mediumKey, en: meta.mediumKey }
      : undefined;

  return {
    project: {
      ...base,
      ...meta,
      blocks: contentRaw.blocks,
      ...(medium ? { medium } : {}),
    } satisfies InfographicRuntime,
  };
};

export const entries: EntryGenerator = async () => {
  return projects
    .filter((p) => p.category === "infografia" && typeof p.slug === "string")
    .map((p) => ({ slug: p.slug as string }));
};

export const prerender = true;
