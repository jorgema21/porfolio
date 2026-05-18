<script lang="ts">
  import { base } from "$app/paths";
  import { preview, closePreview } from "$lib/stores/infographicPreview.svelte";
  import { lang } from "$lib/i18n/lang";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import { fade, scale } from "svelte/transition";

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Escape") closePreview();
  }

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const medium = (key?: string) =>
    key ? (infographicsI18n[$lang].mediums[key as MediumKey] ?? key) : null;
</script>

{#if preview.project}
  <dialog
    class="preview-overlay"
    open
    autofocus
    onkeydown={handleKey}
    aria-label="Preview del proyecto"
    transition:fade={{ duration: 150 }}
  >
    <!-- BACKDROP ORIGINAL: Con tu blur y cierre exactos -->
    <button
      class="preview-backdrop"
      type="button"
      aria-label="Cerrar preview"
      onclick={closePreview}
    ></button>

    <!-- CARD -->
    <div class="preview-card" transition:scale={{ duration: 220, start: 0.94 }}>
      <!-- CLOSE -->
      <button
        class="preview-close"
        type="button"
        onclick={closePreview}
        aria-label="Cerrar preview"
      >
        ✕
      </button>

      <!-- IMAGE: Con su clase para que no se desborde -->
      <img
        src={`${base}${preview.project.image}`}
        alt={preview.project.title[$lang]}
        class="preview-image"
      />

      <!-- CONTENT -->
      <div class="preview-content">
        <div class="preview-meta cluster">
          {#if preview.project.mediumKey}
            <span>{medium(preview.project.mediumKey)}</span>
          {/if}

          {#if preview.project.mediumKey && preview.project.date}
            <span>·</span>
          {/if}

          {#if preview.project.date}
            <span>{formatDate(preview.project.date, $lang)}</span>
          {/if}

          {#if preview.project.colaboracion}
            <span>·</span>
            <span>
              {preview.project.colaboracion.tipo === "equipo"
                ? "Equipo"
                : "Solo"}
            </span>
          {/if}
        </div>

        <h2>
          <a
            class="preview-link link-underline"
            href={`${base}/infografias/${preview.project.slug}`}
          >
            {preview.project.title[$lang]} ↗
          </a>
        </h2>

        {#if preview.project.description}
          <p>{preview.project.description[$lang]}</p>
        {/if}
      </div>
    </div>
  </dialog>
{/if}

<style>
  /* ==========================================================================
     TU DISEÑO VISUAL ORIGINAL (100% INTACTO Y AJUSTADO)
     ========================================================================== */
  .preview-overlay,
  .preview-backdrop {
    position: fixed;
    inset: 0;
  }

  .preview-overlay {
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 0;
    background: transparent;
  }

  .preview-backdrop {
    border: none;
    background-color: var(--bg-soft);
    backdrop-filter: blur(6px);
    cursor: pointer;
  }

  .preview-card {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    max-width: 550px;
    max-height: 90vh;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background-color: var(--blue-100);
  }

  .preview-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }

  .preview-close {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-white);
    color: var(--color-black);
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    opacity: 0.8;
    z-index: 6;
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast);
  }

  .preview-close:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .preview-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4);
  }

  .preview-content h2 {
    width: fit-content;
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-lg);
  }

  .preview-meta,
  .preview-content p {
    color: var(--color-muted);
  }

  .preview-meta {
    font-size: var(--text-xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .preview-link {
    display: inline-block;
    margin-top: var(--space-2);
    color: inherit;
    text-decoration: none;
    transition: color var(--transition);
  }

  .preview-link:hover {
    color: var(--blue-300);
  }
  /* ==========================================================================
     SISTEMA RESPONSIVO (ADAPTACIÓN DE TAMAÑO PARA MÓVIL)
     ========================================================================== */
  @media (max-width: 768px) {
    .preview-card {
      max-width: 60%;
      max-height: 75vh;
      margin-inline: var(--space-4);
    }

    .preview-content {
      padding: var(--space-3);
      gap: var(--space-1);
    }

    .preview-content h2 {
      font-size: var(--text-base);
    }

    .preview-content p {
      font-size: var(--text-sm);
      line-height: 1.5;
    }
  }
</style>
