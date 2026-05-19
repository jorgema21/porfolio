<script lang="ts">
  import projects from "$lib/data/projects";
  import AnimatedZone from "$lib/components/home/AnimatedZone.svelte";
  import { t } from "$lib/i18n";

  const homeProjects = $derived(projects.filter((p) => p.homeVisible ?? true));
  const introLines = $derived($t.home.intro);
</script>

<main class="layout">
  <section class="home-intro">
    <p>
      {#each introLines as line, i (i)}
        {line}{#if i < introLines.length - 1}<br />{/if}
      {/each}
    </p>
  </section>

  <section class="home-grid section">
    <AnimatedZone items={homeProjects} />
  </section>
</main>

<style>
  .layout {
    display: grid;
    gap: var(--space-8);

    max-width: var(--content-width);

    margin-inline: auto;

    padding-inline: var(--space-4);
  }

  .home-intro {
    text-align: center;
    font-family: var(--font-serif);
    font-size: var(--text-sm);
    line-height: 1.7;

    p {
      margin: 0;
    }
  }

  .home-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--space-6);
    align-items: start;
  }

  @media (max-width: 768px) {
    .home-grid {
      grid-template-columns: 1fr;
    }

    .home-intro {
      font-size: var(--text-xs);
    }
  }
</style>
