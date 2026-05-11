<script lang="ts">
  import { lightbox, closeLightbox } from "$lib/stores/lightbox.svelte";
  import { base } from '$app/paths';

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  }
</script>

{#if lightbox.image}
  <div
    class="overlay"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    onclick={closeLightbox}
    onkeydown={handleKeydown}
  >
    <!-- botón para accesibilidad -->
    <button
      class="image-button"
      onclick={(e) => e.stopPropagation()}
      aria-label="Cerrar imagen ampliada"
    >
      <img
        src={`${base}${lightbox.image}`}
        alt=""
        class="image"
      />
    </button>
  </div>
{/if}

<style>
 
</style>