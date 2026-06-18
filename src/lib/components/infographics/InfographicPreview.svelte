<script lang="ts">
  import { base } from "$app/paths";
  import { preview, closePreview } from "$lib/state/infographicPreview.svelte";
  import { langSignal } from "$lib/i18n/index.svelte";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import { fade, scale } from "svelte/transition";
  import type { Lang } from "../../../routes/graphics/infographics.svelte";
  import { t } from "$lib/i18n/index.svelte";

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Escape") closePreview();
  }

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const medium = (key?: string) =>
    key
      ? (infographicsI18n[langSignal.current].mediums[key as MediumKey] ?? key)
      : null;

  const getLocalized = (field: unknown): Record<Lang, string> => {
    return (field || { es: "", en: "" }) as Record<Lang, string>;
  };
</script>

{#if preview.project}
  <dialog
    class="preview-overlay"
    open
    autofocus
    onkeydown={handleKey}
    aria-label={t.infographics.aria.projectPreview}
    transition:fade={{ duration: 150 }}
  >
    <button
      class="preview-backdrop"
      type="button"
      aria-label={t.infographics.aria.closePreview}
      onclick={closePreview}
    ></button>

    <div class="preview-card" transition:scale={{ duration: 220, start: 0.94 }}>
      <button
        class="preview-close"
        type="button"
        onclick={closePreview}
        aria-label={t.infographics.aria.closePreview}
      >
        ✕
      </button>

      <img
        src={`${base}${preview.project.image}`}
        alt={getLocalized(preview.project.title)[langSignal.current]}
        class="preview-image"
        loading="lazy"
        decoding="async"
        width="450"
        height="300"
      />

      <div class="preview-content">
        <div class="preview-meta cluster">
          {#if preview.project.mediumKey}
            <span>{medium(preview.project.mediumKey)}</span>
          {/if}

          {#if preview.project.mediumKey && preview.project.date}
            <span>·</span>
          {/if}

          {#if preview.project.date}
            <span>{formatDate(preview.project.date, langSignal.current)}</span>
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
            href={`${base}/graphics/${preview.project.slug}`}
          >
            {getLocalized(preview.project.title)[langSignal.current]}
            <svg
              class="icon-external"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </h2>

        {#if preview.project.description}
          <p>{getLocalized(preview.project.description)[langSignal.current]}</p>
        {/if}
      </div>
    </div>
  </dialog>
{/if}

<style>
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
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    background-color: var(--bg-soft);
  }

  .preview-close {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border: var(--border-1);
    border-radius: var(--radius-md);
    background: var(--color-white);
    color: var(--color-black);
    font-size: var(--text-base);
    line-height: var(--lh-solid);
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
    color: var(--blue-500);
  }

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
      line-height: var(--lh-base);
    }
  }
</style>
