<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import type { Project } from "$lib/data/projects";
  import "$lib/styles/layout.css";

  let { main, side, bottom } = $props<{
    main?: Project;
    side: Project[];
    bottom: Project[];
  }>();
</script>

<section class="grid grid-invert">
  <div class="stack">
    {#each side as p}
      <ProjectCard project={p} />
    {/each}
  </div>

  <div class="block-main">
    {#if main}
      <ProjectCard project={main} />
    {/if}
  </div>

  <div class="grid-bottom">
    {#each bottom as p}
      <ProjectCard project={p} />
    {/each}
  </div>
</section>

