<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";
  import { formatDate } from "$lib/utils/formatDate";
  import { lang } from "$lib/i18n/lang";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

  const { project } = $props<{ project: ProjectContent }>();

  const hasMeta = $derived(
    () =>
      !!project.mediumKey ||
      !!project.date ||
      !!project.apartado ||
      !!project.usos?.length
  );

  // 🔥 clave tipada correctamente (evita el error de index signature)
  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  const getMediumLabel = (key: MediumKey) =>
    infographicsI18n[$lang].mediums[key] ?? key;
</script>

{#if hasMeta()}
  <div class="meta-top">
    <!-- LEFT -->
    <div class="meta-left">
      {#if project.mediumKey}
        {#if project.url}
          <a class="medium-link" href={project.url}>
            {getMediumLabel(project.mediumKey as MediumKey)} ↗
          </a>
        {:else}
          <span>{getMediumLabel(project.mediumKey as MediumKey)}</span>
        {/if}
      {/if}

      {#if project.mediumKey && project.date}
        <span>·</span>
      {/if}

      {#if project.date}
        <span>{formatDate(project.date, $lang)}</span>
      {/if}
    </div>

    <!-- CENTER -->
    {#if project.usos?.length}
      <div class="meta-center">
        {#each project.usos as uso}
          <span class="tag">{uso[$lang]}</span>
        {/each}
      </div>
    {/if}

    <!-- RIGHT -->
    {#if project.apartado}
      <div class="meta-right">
        <span class="apartado">
          {APARTADOS[project.apartado as ApartadoKey].label[$lang]}
        </span>
      </div>
    {/if}
  </div>
{/if}