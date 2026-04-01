<script lang="ts">
  import { projects } from '$lib/data/projects';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  // ZONAS (según tu diseño)
  const heroMain = projects[0];
  const heroSide = projects.slice(1, 4);

  const gridTop = projects.slice(4, 7);

  const features = projects.slice(7, 9);

  const listBlock = projects.slice(9, 12);

  const heroBottom = projects[12]; // el "proyecto 10 visual"

  const finalGrid = projects.slice(13, 16);
</script>

<main class="layout">
  <!-- HERO -->
  <section class="hero">
    <div class="hero-main">
      <ProjectCard project={heroMain} variant="hero" />
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
      <ProjectCard project={heroBottom} variant="hero" />
    </div>
  </section>

  <!-- FINAL GRID -->
  <section class="grid-final">
    {#each finalGrid as p}
      <ProjectCard project={p} variant="grid" />
    {/each}
  </section>
</main>