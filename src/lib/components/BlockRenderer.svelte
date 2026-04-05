<script lang="ts">
  import { openLightbox } from "$lib/stores/lightbox.svelte";

  const { block, slug } = $props();

  const getSrc = (src: string) => `/images/infografias/${slug}/${src}`;
</script>

{#if block.type === "hero" || block.type === "image"}
  <button
    onclick={() => openLightbox(getSrc(block.src))}
    aria-label="Abrir imagen"
  >
    <img
      src={getSrc(block.src)}
      alt=""
      class={block.type === "hero" ? "hero" : "content-image"}
      loading="lazy"
    />
  </button>

{:else if block.type === "text"}
  <p class="text">{block.content}</p>

{:else if block.type === "divider"}
  <div class="divider" role="separator"></div>
{/if}