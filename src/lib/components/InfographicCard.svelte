<script lang="ts">
  import type { Infographic } from "$lib/data/infographics.data";
  import { lang } from "$lib/i18n/lang";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import { openPreview } from "$lib/stores/infographicPreview.svelte";

  const { project } = $props<{ project: Infographic }>();

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const medium = $derived(() =>
    project.mediumKey
      ? infographicsI18n[$lang].mediums[project.mediumKey as MediumKey]
      : null
  );
</script>

<button
  class="infographics-card"
  onclick={() => openPreview(project)}
>
  <div class="thumb">
    <img src={project.image} alt={project.title[$lang]} loading="lazy" />

    <div class="overlay">
      <h3>{project.title[$lang]}</h3>

      {#if medium() || project.date}
        <div class="meta cluster">
          {#if medium()}
            <span>{medium()}</span>
          {/if}

          {#if medium() && project.date}
            <span>·</span>
          {/if}

          {#if project.date}
            <span>{formatDate(project.date, $lang)}</span>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</button>