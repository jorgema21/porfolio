<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";
  import { formatDate } from "$lib/utils/formatDate";
  import { lang } from "$lib/i18n/lang";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

  const { project } = $props<{ project: ProjectContent }>();

  // 1. Guardia de tipo estricto: asegura a TS que el string es una clave real de APARTADOS
  function isApartadoKey(key: string | undefined): key is ApartadoKey {
    return key !== undefined && key in APARTADOS;
  }

  // 2. La runa ahora infiere el tipo perfectamente sin errores de indexación
  const apartadoLabel = $derived.by(() => {
    const key = project.apartado;
    if (isApartadoKey(key)) {
      return APARTADOS[key].label[$lang]; // <- Aquí 'key' ya es estrictamente 'ApartadoKey'
    }
    return null;
  });

  const mediumLabel = $derived.by(() => {
    if (!project.mediumKey) return null;
    const dictionary = infographicsI18n[$lang].mediums;
    return project.mediumKey in dictionary
      ? dictionary[project.mediumKey as keyof typeof dictionary]
      : null;
  });

  const hasMeta = $derived(
    !!mediumLabel ||
      !!project.date ||
      !!apartadoLabel ||
      !!project.usos?.length,
  );
</script>

{#if hasMeta}
  <div class="meta-top">
    <div class="meta-left">
      {#if mediumLabel}
        {#if project.url}
          <a class="link-underline medium-link" href={project.url}>
            {mediumLabel} ↗
          </a>
        {:else}
          <span class="link-underline">
            {mediumLabel}
          </span>
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
      <div class="meta-center">
        {#each project.usos as uso}
          <span class="tag">{uso[$lang]}</span>
        {/each}
      </div>
    {/if}

    {#if apartadoLabel}
      <div class="meta-right">
        <span class="badge apartado">
          {apartadoLabel}
        </span>
      </div>
    {/if}
  </div>
{/if}
