import type { Block } from "$lib/types/block";
import type { Lang } from "$lib/i18n/lang.svelte";

export const getImageSrc = (block: Block, slug: string) => {
  if (block.type !== "image" && block.type !== "hero") {
    return "";
  }

  return `/images/graphics/${slug}/${block.src}`;
};

export const getText = (block: Block, lang: Lang) => {
  if (block.type !== "text") {
    return "";
  }

  const value = block.value?.[lang] ?? block.value?.es;

  if (Array.isArray(value)) {
    return value.join(" ");
  }

  return value ?? "";
};
