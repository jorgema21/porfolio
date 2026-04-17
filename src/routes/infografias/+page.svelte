<script lang="ts">
  import projects from "$lib/data/projects";
  import type { Project } from "$lib/data/projects";
  import { t, lang } from "$lib/i18n";

  const infografias = $derived(
    projects.filter((p: Project) => p.category === "infografia"),
  );
</script>

<h1>{$t.infographics.title}</h1>

<ul>
  {#each infografias as project}
    <li>
      {project.title[$lang]}
    </li>
  {/each}
</ul>
