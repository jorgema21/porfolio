<script lang="ts">
  import { base } from '$app/paths'; // <--- Añadimos el import del base path
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { lang } from "$lib/i18n/lang";
  import type { Block } from "$lib/types/block";

  const { block, slug } = $props<{
    block: Block;
    slug: string;
  }>();

  // Modificamos el src para que incluya {base}
  const src = $derived.by(() =>
    "src" in block
      ? `${base}/images/infografias/${slug}/${block.src}` // <--- Añadimos {base} aquí
      : ""
  );

  const textValue = $derived.by(() => {
    if (block.type !== "text") return "";

    const value =
      block.value?.[$lang] ??
      block.value?.es;

    return Array.isArray(value)
      ? value.join(" ")
      : value;
  });
</script>

{#if block.type === "hero" || block.type === "image"}
  <div class="image-wrapper">
    {#if block.caption}
      <span class="image-title">
        {block.caption[$lang]}
      </span>
    {/if}

    <button onclick={() => openLightbox(src)}>
      <img
        class={`image ${
          block.type === "hero"
            ? "image--cover"
            : "image--content"
        }`}
        {src}
        alt={block.alt?.[$lang] ?? ""}
        loading="lazy"
      />
    </button>
  </div>

{:else if block.type === "text"}
  <p class="text">{textValue}</p>

{:else if block.type === "divider"}
  <div class="divider"></div>
{/if}
