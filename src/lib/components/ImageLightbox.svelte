<script lang="ts">
  import { lightbox, closeLightbox } from "$lib/state/lightbox.svelte";
  import { fade, scale } from "svelte/transition";

  import { t } from "$lib/i18n/index.svelte";

  function handleClose() {
    closeLightbox();
  }
</script>

{#if lightbox.image}
  <dialog
    class="lightbox-overlay"
    open
    onclose={handleClose}
    aria-label={t.layout.lightbox.enlargedImage}
    transition:fade={{ duration: 150 }}
  >
    <button
      class="lightbox-backdrop"
      type="button"
      aria-label={t.layout.lightbox.closeImage}
      onclick={closeLightbox}
    ></button>

    <div
      class="lightbox-container"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <button
        class="lightbox-close"
        type="button"
        onclick={closeLightbox}
        aria-label={t.layout.lightbox.closeImage}
      >
        ✕
      </button>
      <img
        src={lightbox.image}
        alt={t.layout.lightbox.altImage}
        class="lightbox-image"
      />
    </div>
  </dialog>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    border: none;
    padding: 0;
    margin: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-soft, rgba(0, 0, 0, 0.85));
    backdrop-filter: blur(6px);
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .lightbox-container {
    position: relative;
    z-index: 2;
    display: inline-flex;
    max-width: 90vw;
    max-height: 90vh;
  }

  .lightbox-image {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    display: block;
    box-shadow: var(--shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.3));
    border-radius: var(--radius-md, 4px);
  }

  .lightbox-close {
    position: absolute;
    top: var(--space-3, 0.75rem);
    right: var(--space-3, 0.75rem);

    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    border: none;
    color: var(--color-white, #fff);
    font-size: var(--text-base, 1rem);
    cursor: pointer;

    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full, 50%);

    opacity: 0.85;
    transition:
      opacity var(--transition, 0.2s),
      background-color var(--transition, 0.2s),
      transform var(--transition, 0.2s);
    z-index: 10;
  }

  .lightbox-close:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }

  .lightbox-close:focus-visible {
    outline: 2px solid var(--color-white, #fff);
    outline-offset: 2px;
    border-radius: var(--radius-full, 50%);
  }

  @media (max-width: 768px) {
    .lightbox-close {
      top: var(--space-4, 1rem);
      right: var(--space-4, 1rem);
      width: 40px;
      height: 40px;
      font-size: var(--text-lg, 1.25rem);
    }
  }
</style>
