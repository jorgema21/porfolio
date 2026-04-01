<script lang="ts">
  import projects from "$lib/data/projects";

  const infografias = projects.filter(
    (p: Project) => p.category === "infografia",
  );
  import type { Project } from "$lib/data/projects";
</script>

<h1>Infografías</h1>

<ul>
  {#each infografias as project}
    <li>{project.title.es}</li>
  {/each}
</ul>
