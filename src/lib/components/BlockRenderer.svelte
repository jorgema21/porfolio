<script lang="ts">
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { lang } from "$lib/i18n/lang";
  import type { Block } from "$lib/types/block";

  const { block, slug } = $props<{
    block: Block;
    slug: string;
  }>();

  const src = $derived(() =>
    "src" in block ? `/images/infografias/${slug}/${block.src}` : ""
  );

  const textValue = $derived(() => {
    if (block.type !== "text") return "";

    const value = block.value?.[$lang] ?? block.value?.es;
    return Array.isArray(value) ? value.join(" ") : value;
  });
</script>

{#if block.type === "hero" || block.type === "image"}
  <div class="image-wrapper">
    {#if block.caption}
      <span class="image-title">
        {block.caption[$lang]}
      </span>
    {/if}

    <button onclick={() => openLightbox(src())}>
      <img
        src={src()}
        alt={block.alt?.[$lang] ?? ""}
        class={block.type === "hero" ? "cover" : "content-image"}
        loading="lazy"
      />
    </button>
  </div>

{:else if block.type === "text"}
  <p class="text">{textValue()}</p>

{:else if block.type === "divider"}
  <div class="divider"></div>
{/if}