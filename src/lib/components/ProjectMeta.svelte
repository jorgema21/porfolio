<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";
  import { formatDate } from "$lib/utils/formatDate";
  import { lang } from "$lib/i18n/lang";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

  const { project } = $props<{ project: ProjectContent }>();

  const hasMeta = $derived(() =>
    !!project.mediumKey ||
    !!project.date ||
    !!project.apartado ||
    !!project.usos?.length
  );

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const mediumLabel = $derived(() =>
    project.mediumKey
      ? infographicsI18n[$lang].mediums[project.mediumKey as MediumKey]
      : null
  );

  const apartadoLabel = $derived(() =>
    project.apartado
      ? APARTADOS[project.apartado as ApartadoKey].label[$lang]
      : null
  );
</script>

{#if hasMeta()}
  <div class="meta-top">

    <div class="meta-left u-meta-row">
      {#if mediumLabel()}
        {#if project.url}
          <a class="link-underline medium-link" href={project.url}>
            {mediumLabel()} ↗
          </a>
        {:else}
          <span class="link-underline">{mediumLabel()}</span>
        {/if}
      {/if}

      {#if project.mediumKey && project.date}
        <span>·</span>
      {/if}

      {#if project.date}
        <span>{formatDate(project.date, $lang)}</span>
      {/if}
    </div>

    {#if project.usos?.length}
      <div class="meta-center u-meta-row">
        {#each project.usos as uso}
          <span class="tag">{uso[$lang]}</span>
        {/each}
      </div>
    {/if}

    {#if apartadoLabel()}
      <div class="meta-right">
        <span class="badge apartado">
          {apartadoLabel()}
        </span>
      </div>
    {/if}

  </div>
{/if}