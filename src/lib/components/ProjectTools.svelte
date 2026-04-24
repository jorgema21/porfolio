<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { lang } from "$lib/i18n/lang";

  const { project } = $props<{ project: ProjectContent }>();
</script>

{#if project.tools?.length}
  <footer class="tools">
    <h3>
      {$lang === "es" ? "Herramientas" : "Tools"}
    </h3>

    <ul>
      {#each project.tools as tool}
        <li>{tool}</li>
      {/each}
    </ul>
  </footer>
{/if}