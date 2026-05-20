<script lang="ts">
  import { lightbox, closeLightbox } from "$lib/stores/lightbox.svelte";

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  }

  function autoFocus(node: HTMLElement) {
    node.focus();
  }
</script>

{#if lightbox.image}

  <div
    class="lightbox-overlay"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    use:autoFocus
    onclick={closeLightbox}
    onkeydown={handleKeydown}
  >
    <button
      class="image-button"
      onclick={(e) => e.stopPropagation()}
      aria-label="Cerrar imagen ampliada"
    >
      <img src={lightbox.image} alt="Imagen ampliada" class="lightbox-image" />
    </button>
  </div>
{/if}


<style>
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--bg-soft);
    backdrop-filter: blur(6px);
    cursor: pointer;
  }

  .lightbox-image {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    display: block;
  }

  .image-button {
    all: unset;
    cursor: default;
  }

  .image-button:focus-visible {
    outline: 2px solid var(--color-white);
    outline-offset: 4px;
  }
</style>
