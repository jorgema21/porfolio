<script lang="ts">
  import type { Infographic } from "$lib/data/infographics.data";
  import { lang } from "$lib/i18n/lang";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import { openPreview } from "$lib/stores/infographicPreview.svelte";
  import { base } from "$app/paths";

  const { project } = $props<{ project: Infographic }>();

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const medium = $derived(
    project.mediumKey
      ? infographicsI18n[$lang].mediums[project.mediumKey as MediumKey]
      : null,
  );

  const date = $derived(project.date ? formatDate(project.date, $lang) : null);

  const hasMeta = $derived(!!(medium || date));
</script>

<button class="infographics-card" onclick={() => openPreview(project)}>
  <div class="thumb">
    <img
      src={`${base}${project.image}`}
      alt={project.title[$lang]}
      loading="lazy"
    />

    <div class="overlay">
      <h3>{project.title[$lang]}</h3>

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
</button>

<style>
  .infographics-card {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    width: 100%;
    display: block;
  }

  .thumb {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-lg);
  }

  .thumb img {
    width: 100%;
    height: auto;
    display: block;
  }

  .infographics-card .overlay {
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

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgb(0, 0, 0, 0.9);
    cursor: zoom-out;
  }

  .infographics-card .overlay h3,
  .infographics-card .meta {
    font-family: var(--font-serif);
  }

  .infographics-card .overlay h3 {
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
