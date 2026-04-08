<script lang="ts">
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { lang } from "$lib/i18n/lang";

  const { block, slug } = $props();

  const currentLang = $derived(lang);

  const getSrc = (src: string) => `/images/infografias/${slug}/${src}`;
</script>

{#if block.type === "hero" || block.type === "image"}
  <div class="image-wrapper">
    {#if block.caption}
      <span class="image-title">
        {block.caption[$currentLang]}
      </span>
    {/if}

    <button onclick={() => openLightbox(getSrc(block.src))}>
      <img
        src={getSrc(block.src)}
        alt={block.alt?.[$currentLang] ?? ""}
        class={block.type === "hero" ? "cover" : "content-image"}
        loading="lazy"
      />
    </button>
  </div>
{:else if block.type === "text"}
  {@const value = block.value?.[$currentLang] ?? block.value?.es}

  <p class="text">
    {Array.isArray(value) ? value.join(" ") : value}
  </p>
{:else if block.type === "divider"}
  <div class="divider"></div>
{/if}
