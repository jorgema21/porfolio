<script lang="ts">
  import type { Project } from "$lib/types/project";
  import { APARTADOS } from "$lib/config/apartados.config";
  import { ROLE_MAP } from "$lib/config/roles";
  import { formatDate } from "$lib/utils/formatDate";
  import { lang } from "$lib/i18n/lang";
  import { t } from "$lib/i18n";
  import type { ApartadoKey } from "$lib/config/apartados.config";

  const { project } = $props<{ project: Project }>();
</script>

{#if project.mediumKey || project.date || project.apartado || project.usos?.length}
  <div class="meta-top">
    <!-- LEFT -->
    <div class="meta-left">
      {#if project.mediumKey}
        {@const mediumDict = $t.infographics.mediums as Record<string, string>}
        {@const label = mediumDict[project.mediumKey] ?? project.mediumKey}

        {#if project.url}
          <a class="medium-link" href={project.url}>
            {label} ↗
          </a>
        {:else}
          <span>{label}</span>
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
          <span class="tag">
            {uso[$lang]}
          </span>
        {/each}
      </div>
    {/if}

    <!-- RIGHT -->
    {#if project.apartado}
      {@const apartado = project.apartado as ApartadoKey}

      <div class="meta-right">
        <span class="apartado">
          {APARTADOS[apartado].label[$lang]}
        </span>
      </div>
    {/if}
  </div>
{/if}
