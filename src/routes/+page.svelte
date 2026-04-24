<script lang="ts">
  import projects from "$lib/data/projects";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import type { HomeZone, HomeProject } from "$lib/data/projects";

  const zones: HomeZone[] = [
    "heroMain",
    "heroSide",
    "gridTop",
    "features",
    "listBlock",
    "heroBottom",
    "finalGrid",
  ];

  const getZone = (name: HomeZone): HomeProject[] =>
    projects
      .filter((p) => p.homeZone === name && (p.homeVisible ?? true))
      .sort((a, b) => (a.homeOrder ?? 999) - (b.homeOrder ?? 999));

  const zonesData = Object.fromEntries(
    zones.map((z) => [z, getZone(z)])
  ) as Record<HomeZone, HomeProject[]>;
</script>

<main class="layout">
  <section class="hero">
    <div class="hero-main">
      {#if zonesData.heroMain?.[0]}
        <ProjectCard project={zonesData.heroMain[0]} variant="hero" />
      {/if}
    </div>

    <div class="hero-side">
      {#each zonesData.heroSide as p (p.id)}
        <ProjectCard project={p} variant="list" />
      {/each}
    </div>
  </section>

  <section class="grid-3">
    {#each zonesData.gridTop as p (p.id)}
      <ProjectCard project={p} variant="grid" />
    {/each}
  </section>

  <section class="features">
    {#each zonesData.features as p (p.id)}
      <ProjectCard project={p} variant="feature" />
    {/each}
  </section>

  <section class="bottom-block">
    <div class="list">
      {#each zonesData.listBlock as p (p.id)}
        <ProjectCard project={p} variant="list" />
      {/each}
    </div>

    <div class="hero-right">
      {#if zonesData.heroBottom?.[0]}
        <ProjectCard project={zonesData.heroBottom[0]} variant="hero" />
      {/if}
    </div>
  </section>

  <section class="grid-final">
    {#each zonesData.finalGrid as p (p.id)}
      <ProjectCard project={p} variant="grid" />
    {/each}
  </section>
</main>