<script lang="ts">
  import projects from "$lib/data/projects";

  const estilo = projects.filter(
    (p: Project) => p.category === "estilo",
  );
  import type { Project } from "$lib/data/projects";
</script>

<h1>Estilo</h1>

<ul>
  {#each estilo as project}
    <li>{project.title.es}</li>
  {/each}
</ul>
