<script lang="ts">
  import type { Infographic } from "$lib/data/infographics.data";
  import { langSignal } from "$lib/i18n/index.svelte";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import { openPreview } from "$lib/state/infographicPreview.svelte";
  import { base } from "$app/paths";

  const { project, index = 0 } = $props<{
    project: Infographic;
    index?: number;
  }>();

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const medium = $derived(
    project.mediumKey
      ? infographicsI18n[langSignal.current].mediums[
          project.mediumKey as MediumKey
        ]
      : null,
  );

  const date = $derived(
    project.date ? formatDate(project.date, langSignal.current) : null,
  );

  const hasMeta = $derived(!!(medium || date));
  const isCritical = $derived(index < 2);
</script>

<div
  class="infographics-card"
  onclick={() => openPreview(project)}
  onkeydown={(e) => e.key === "Enter" && openPreview(project)}
  role="button"
  tabindex="0"
  aria-label="Ver detalles de {project.title[langSignal.current]}"
>
  <div class="thumb">
    <img
      src={`${base}${project.image}`}
      alt=""
      width="800"
      height="450"
      decoding="async"
      loading={isCritical ? "eager" : "lazy"}
      fetchpriority={isCritical ? "high" : "low"}
    />

    <div class="card-overlay">
      <h3>{project.title[langSignal.current]}</h3>

      {#if hasMeta}
        <div class="meta cluster">
          {#if medium}
            <span>{medium}</span>
          {/if}

          {#if medium && date}
            <span>·</span>
          {/if}

          {#if date}
            <span>{date}</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .infographics-card {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    width: 100%;
    display: block;
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: transform var(--transition);
  }

  .infographics-card:hover {
    transform: var(--hover-lift);
  }

  .infographics-card:focus-visible {
    outline: 2px solid var(--color-infography, #2563eb);
    outline-offset: 4px;
  }

  .thumb {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-lg);
    aspect-ratio: 16 / 9;
    background-color: var(--bg-soft, #1a1a1a);
  }

  .thumb img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  .infographics-card .card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--space-4);
    background: var(--overlay-gradient);
    z-index: 2;
    cursor: pointer;
  }

  .infographics-card .card-overlay h3,
  .infographics-card .meta {
    font-family: var(--font-serif);
  }

  .infographics-card .card-overlay h3 {
    margin: 0;
    font-size: var(--text-base);
    color: var(--color-white);
  }

  .infographics-card .meta {
    font-size: var(--text-xs);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--overlay-text-color);
  }
</style>
