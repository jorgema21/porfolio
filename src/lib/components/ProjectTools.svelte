<script lang="ts">
  import type { Project } from "$lib/types/project";
  import { lang } from "$lib/i18n/lang";

  const { project } = $props<{ project: Project }>();
</script>

{#if project.tools?.length}
  <footer>
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