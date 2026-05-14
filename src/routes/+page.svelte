<script lang="ts">
  import projects from "$lib/data/projects";

  import AnimatedZone from "$lib/components/home/AnimatedZone.svelte";

  import { t } from "$lib/i18n";

  const homeProjects = projects.filter(
    (p) => p.homeVisible ?? true,
  );
</script>

<main class="layout">
  <section class="home-intro">
    <p>
      {#each $t.home.intro as line, i}
        {line}
        {#if i < $t.home.intro.length - 1}
          <br />
        {/if}
      {/each}
    </p>
  </section>

  <section class="home-grid section">
    <AnimatedZone items={homeProjects} />
  </section>
</main>