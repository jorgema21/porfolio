<script lang="ts">
  import projects from "$lib/data/projects";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import ZoneRenderer from "$lib/components/ZoneRenderer.svelte";
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

  <!-- HERO -->
  <section class="grid-hero">
    <div>
      {#if zonesData.heroMain?.[0]}
        <ProjectCard project={zonesData.heroMain[0]} variant="hero" />
      {/if}
    </div>

    <div class="stack">
      <ZoneRenderer items={zonesData.heroSide} variant="list" />
    </div>
  </section>

  <!-- GRID TOP -->
  <section class="grid grid-3 section">
    <ZoneRenderer items={zonesData.gridTop} variant="grid" />
  </section>

  <!-- FEATURES -->
  <section class="stack section">
    <ZoneRenderer items={zonesData.features} variant="feature" />
  </section>

  <!-- BOTTOM -->
  <section class="grid grid-sidebar section">
    <div class="stack">
      <ZoneRenderer items={zonesData.listBlock} variant="list" />
    </div>

    <div>
      {#if zonesData.heroBottom?.[0]}
        <ProjectCard project={zonesData.heroBottom[0]} variant="hero" />
      {/if}
    </div>
  </section>

  <!-- FINAL GRID -->
  <section class="grid grid-3 section">
    <ZoneRenderer items={zonesData.finalGrid} variant="grid" />
  </section>

</main>