<script lang="ts">
  import ProjectCard from "$lib/components/home/ProjectCard.svelte";

  import type { HomeProject } from "$lib/data/projects";

  import { fly } from "svelte/transition";

  import { cubicOut } from "svelte/easing";

  const { items } = $props<{
    items: HomeProject[];
  }>();

  let visibleCount = $state(0);

  const baseDelay = 120;

  $effect(() => {
    if (!items?.length) return;

    visibleCount = 0;

    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < items.length; i++) {
        if (cancelled) return;

        visibleCount = i + 1;

        await new Promise((r) =>
          setTimeout(r, baseDelay),
        );
      }
    };

    run();

    return () => {
      cancelled = true;
    };
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
