<script lang="ts">
	import { projects } from '$lib/data/projects';
	import '$lib/styles/home.css';

	const heroMain = projects.find((p) => p.section === 'hero-main');
	const heroSide = projects.filter((p) => p.section === 'hero-side');
	const heroBottom = projects.filter((p) => p.section === 'hero-bottom');

	const full = projects.filter((p) => p.section === 'full');

	const invertSide = projects.filter((p) => p.section === 'invert-side');
	const invertMain = projects.find((p) => p.section === 'invert-main');
	const invertBottom = projects.filter((p) => p.section === 'invert-bottom');
</script>

<div class="page">
  <header class="topbar">
    <h1>Mi Portfolio</h1>
  </header>

  <!-- HERO -->
  <section class="hero-grid">
    <div class="hero-main">
      {heroMain?.title.es}
    </div>

    <div class="hero-side">
      {#each heroSide as mini}
        <div class="mini">{mini.title.es}</div>
      {/each}
    </div>
  </section>

  <!-- minis debajo del hero -->
  <section class="hero-bottom">
    {#each heroBottom as mini}
      <div class="mini">{mini.title.es}</div>
    {/each}
  </section>

  <!-- full projects -->
  <section class="full">
    {#each full as project}
      <div class="full-project">
        {project.title.es}
      </div>
    {/each}
  </section>

  <!-- invertido -->
  <section class="invert-grid">
    <div class="invert-side">
      {#each invertSide as mini}
        <div class="mini">{mini.title.es}</div>
      {/each}
    </div>

    <div class="invert-main">
      {invertMain?.title.es}
    </div>
  </section>

  <section class="invert-bottom">
    {#each invertBottom as mini}
      <div class="mini">{mini.title.es}</div>
    {/each}
  </section>
</div>
