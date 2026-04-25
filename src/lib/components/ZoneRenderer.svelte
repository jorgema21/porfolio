<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import type { HomeProject } from "$lib/data/projects";

  const { items, variant } = $props<{
    items: HomeProject[];
    variant: "hero" | "grid" | "list" | "feature";
  }>();
</script>

{#each items as p (p.id)}
  <ProjectCard project={p} {variant} />
{/each}