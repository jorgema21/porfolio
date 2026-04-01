<script lang="ts">
  import projects from "$lib/data/projects";
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  function zone(name: string) {
  return projects
    .filter((p) => p.homeZone === name && (p.homeVisible ?? true))
    .sort((a, b) => (a.homeOrder ?? 999) - (b.homeOrder ?? 999));
}

  const heroMain = zone("heroMain")[0];
  const heroSide = zone("heroSide");

  const gridTop = zone("gridTop");
  const features = zone("features");
  const listBlock = zone("listBlock");

  const heroBottom = zone("heroBottom")[0];
  const finalGrid = zone("finalGrid");
</script>

<main class="layout">
  <!-- HERO -->
  <section class="hero">
    <div class="hero-main">
      {#if heroMain}
        <ProjectCard project={heroMain} variant="hero" />
      {/if}
    </div>

    <div class="hero-side">
      {#each heroSide as p}
        <ProjectCard project={p} variant="list" />
      {/each}
    </div>
  </section>

  <!-- GRID 3 -->
  <section class="grid-3">
    {#each gridTop as p}
      <ProjectCard project={p} variant="grid" />
    {/each}
  </section>

  <!-- FEATURES -->
  <section class="features">
    {#each features as p}
      <ProjectCard project={p} variant="feature" />
    {/each}
  </section>

  <!-- LIST + HERO RIGHT -->
  <section class="bottom-block">
    <div class="list">
      {#each listBlock as p}
        <ProjectCard project={p} variant="list" />
      {/each}
    </div>

    <div class="hero-right">
      {#if heroBottom}
        <ProjectCard project={heroBottom} variant="hero" />
      {/if}
    </div>
  </section>

  <!-- FINAL GRID -->
  <section class="grid-final">
    {#each finalGrid as p}
      <ProjectCard project={p} variant="grid" />
    {/each}
  </section>
</main>