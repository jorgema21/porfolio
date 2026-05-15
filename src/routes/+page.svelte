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
