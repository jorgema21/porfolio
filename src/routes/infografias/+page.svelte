<script lang="ts">
  import projects from "$lib/data/projects";
  import type { Project } from "$lib/data/projects";
  import { lang } from "$lib/i18n/lang";

  const infografias = $derived(
    projects.filter((p: Project) => p.category === "infografia")
  );
</script>

<h1>
  {$lang === "es" ? "Infografías" : "Infographics"}
</h1>

<ul>
  {#each infografias as project}
    <li>
      {project.title[$lang]}
    </li>
  {/each}
</ul>