import type { Block } from "$lib/types/block";

export const getImageSrc = (block: Block, slug: string) =>
  block.type === "image" || block.type === "hero"
    ? `/images/infografias/${slug}/${block.src}`
    : "";

export const getText = (block: Block, lang: "es" | "en") => {
  if (block.type !== "text") return "";

  const value = block.value?.[lang] ?? block.value?.es;

  return Array.isArray(value) ? value.join(" ") : value;
};