<script lang="ts">
  import type { Project, RoleType } from "$lib/types/project";
  import { ROLE_MAP } from "$lib/config/roles";
  import { formatDate } from "$lib/utils/formatDate";
  import { lang } from "$lib/i18n/lang";
  import { t } from "$lib/i18n/t";

  const { project } = $props<{ project: Project }>();
</script>

{#if project.medium || project.date || project.apartado || project.usos?.length || project.colaboracion}
  <div class="meta">
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

  <div class="meta-blocks">
    {#if project.apartado}
      <span class="apartado">
        {project.apartado[$lang]}
      </span>
    {/if}

    {#if project.usos?.length}
      <div class="meta-list">
        {#each project.usos as uso}
          <span class="tag">
            {uso[$lang]}
          </span>
        {/each}
      </div>
    {/if}

    {#if project.colaboracion}
      {@const tipo = project.colaboracion.tipo as "solo" | "equipo"}

      <div>
        <!-- FIX PRINCIPAL -->
        <span>
          {$t.colaboracion[tipo]}
        </span>

        {#if project.colaboracion.rol?.length}
          <div>
            {#each project.colaboracion.rol as r}
              {@const role = ROLE_MAP[r as RoleType]}

              <span>
                {role.icon}
                {$lang === "es" ? role.es : role.en}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}
