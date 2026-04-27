<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import type { HomeProject } from "$lib/data/projects";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const { items, variant } = $props<{
    items: HomeProject[];
    variant: "hero" | "grid" | "list" | "feature";
  }>();

  let visibleCount = $state(0);

  const baseDelay = 120;

  $effect(() => {
    visibleCount = 0;

    let i = 0;

    const interval = setInterval(() => {
      visibleCount = i + 1;
      i++;

      if (i >= items.length) clearInterval(interval);
    }, baseDelay);

    return () => clearInterval(interval);
  });
</script>

{#each items.slice(0, visibleCount) as p, i (p.id)}
  <div
    transition:fly={{
      y: 34,
      duration: 3000,
      easing: cubicOut
    }}
  >
    <ProjectCard project={p} {variant} />
  </div>
{/each}