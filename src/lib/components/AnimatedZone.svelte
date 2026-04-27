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
    if (!items?.length) return;

    visibleCount = 0;

    const timer = setInterval(() => {
      visibleCount += 1;

      if (visibleCount >= items.length) {
        clearInterval(timer);
      }
    }, baseDelay);

    return () => clearInterval(timer);
  });
</script>

{#each items.slice(0, visibleCount) as p (p.id)}
  <div
    transition:fly={{
      y: 34,
      duration: 2900,
      easing: cubicOut
    }}
  >
    <ProjectCard project={p} {variant} />
  </div>
{/each}