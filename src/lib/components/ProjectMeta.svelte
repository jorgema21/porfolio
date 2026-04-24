<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";
  import { formatDate } from "$lib/utils/formatDate";
  import { lang } from "$lib/i18n/lang";

  const { project } = $props<{ project: ProjectContent }>();

  const hasMeta = $derived(
    () =>
      !!project.medium ||
      !!project.date ||
      !!project.apartado ||
      !!project.usos?.length
  );
</script>

{#if hasMeta()}
  <div class="meta-top">
    <!-- LEFT -->
    <div class="meta-left">
      {#if project.medium}
        {#if project.url}
          <a class="medium-link" href={project.url}>
            {project.medium[$lang]} ↗
          </a>
        {:else}
          <span>{project.medium[$lang]}</span>
        {/if}
      {/if}

      {#if project.medium && project.date}
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