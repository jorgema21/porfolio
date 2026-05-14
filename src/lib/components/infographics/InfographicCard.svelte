<script lang="ts">
  import type { Infographic } from "$lib/data/infographics.data";
  import { lang } from "$lib/i18n/lang";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import { openPreview } from "$lib/stores/infographicPreview.svelte";
  import { base } from '$app/paths';

  const { project } = $props<{ project: Infographic }>();

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const medium = $derived(() =>
    project.mediumKey
      ? infographicsI18n[$lang].mediums[project.mediumKey as MediumKey]
      : null
  );

  const date = $derived(() =>
    project.date ? formatDate(project.date, $lang) : null
  );

  const hasMeta = $derived(() => !!(medium() || date()));
</script>

<button class="infographics-card" onclick={() => openPreview(project)}>
  <div class="thumb">
    <img src={`${base}${project.image}`} alt={project.title[$lang]} loading="lazy" />

    <div class="overlay">
      <h3>{project.title[$lang]}</h3>

      {#if hasMeta()}
        <div class="meta cluster">
          {#if medium()}
            <span>{medium()}</span>
          {/if}

          {#if medium() && date()}
            <span>·</span>
          {/if}

          {#if date()}
            <span>{date()}</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</button>