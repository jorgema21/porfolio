<script lang="ts">
  import projects from "$lib/data/projects";
  import type { HomeZone, HomeProject } from "$lib/data/projects";

  import AnimatedZone from "$lib/components/AnimatedZone.svelte";
  import { t, lang } from "$lib/i18n";

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
    zones.map((z) => [z, getZone(z)]),
  ) as Record<HomeZone, HomeProject[]>;
</script>

<main class="layout">
  <!-- INTRO HOME -->
  <section class="home-intro">
    <p>
      {#each $t.home.intro as line, i}
        {line}{#if i < $t.home.intro.length - 1}<br />{/if}
      {/each}
    </p>
  </section>

  <!-- HERO -->
  <section class="grid-hero">
    <div>
      {#if zonesData.heroMain?.length}
        <AnimatedZone
          items={zonesData.heroMain}
          variant="hero"
        />
      {/if}
    </div>

    <div class="stack">
      <AnimatedZone
        items={zonesData.heroSide}
        variant="list"
      />
    </div>
  </section>

  <!-- GRID TOP -->
  <section class="grid grid-3 section">
    <AnimatedZone
      items={zonesData.gridTop}
      variant="grid"
    />
  </section>

  <!-- FEATURES -->
  <section class="stack section">
    <AnimatedZone
      items={zonesData.features}
      variant="feature"
    />
  </section>

  <!-- BOTTOM -->
  <section class="grid grid-sidebar section">
    <div class="stack">
      <AnimatedZone
        items={zonesData.listBlock}
        variant="list"
      />
    </div>

    <div>
      {#if zonesData.heroBottom?.length}
        <AnimatedZone
          items={zonesData.heroBottom}
          variant="hero"
        />
      {/if}
    </div>
  </section>

  <!-- FINAL GRID -->
  <section class="grid grid-3 section">
    <AnimatedZone
      items={zonesData.finalGrid}
      variant="grid"
    />
  </section>
</main>