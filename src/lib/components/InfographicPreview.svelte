<script lang="ts">
  import { preview, closePreview } from "$lib/stores/infographicPreview.svelte";
  import { lang } from "$lib/i18n/lang";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

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
  >
    <!-- BACKDROP -->
    <button
      class="preview-backdrop"
      type="button"
      aria-label="Cerrar preview"
      onclick={closePreview}
    ></button>

    <!-- CARD -->
    <div class="preview-card">
      <!-- CLOSE -->
      <button
        class="preview-close"
        type="button"
        onclick={closePreview}
        aria-label="Cerrar preview"
      >
        ✕
      </button>

      <!-- IMAGE -->
      <img
        src={preview.project.image}
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

          {#if preview.project.mediumKey && preview.project.date}
            <span>·</span>
          {/if}

          {#if preview.project.colaboracion}
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
            href={`/infografias/${preview.project.slug}`}
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