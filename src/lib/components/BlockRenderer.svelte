<script lang="ts">
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { lang } from "$lib/i18n/lang";

  const { block, slug } = $props();

  const currentLang = $derived(lang);

  const getSrc = (src: string) => `/images/infografias/${slug}/${src}`;
</script>

{#if block.type === "hero" || block.type === "image"}
  <button onclick={() => openLightbox(getSrc(block.src))}>
    <img
      src={getSrc(block.src)}
      alt={block.alt?.[$currentLang] ?? ""}
      class={block.type === "hero" ? "hero" : "content-image"}
      loading="lazy"
    />
  </button>

{:else if block.type === "text"}
  <p>
    {block.value?.[$currentLang] ?? block.value?.es}
  </p>

{:else if block.type === "divider"}
  <div class="divider"></div>
{/if}