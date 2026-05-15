<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  import ProjectCard from "$lib/components/home/ProjectCard.svelte";

  import type { HomeProject } from "$lib/data/projects";

  const { items } = $props<{
    items: HomeProject[];
  }>();

  let visibleCount = $state(0);

  const baseDelay = 120;

  $effect(() => {
    if (!items.length) return;

    visibleCount = 0;

    const interval = setInterval(() => {
      visibleCount += 1;

      if (visibleCount >= items.length) {
        clearInterval(interval);
      }
    }, baseDelay);

    return () => clearInterval(interval);
  });
</script>

{#each items.slice(0, visibleCount) as project (project.id)}
  <div
    class="project-slot"
    style={`
      --col-start:${project.colStart};
      --col-span:${project.colSpan};
      --row-start:${project.rowStart};
      --row-span:${project.rowSpan ?? 1};
    `}
    in:fly={{
      y: 34,
      duration: 2000,
      easing: cubicOut,
    }}
  >
    <ProjectCard {project} />
  </div>
{/each}
