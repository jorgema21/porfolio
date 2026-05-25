<script lang="ts">
  import InfographicCard from "$lib/components/infographics/InfographicCard.svelte";
  import Treemap from "$lib/components/visualizations/Treemap.svelte";
  import InfographicPreview from "$lib/components/infographics/InfographicPreview.svelte";
  import RichText from "$lib/components/writing/RichText.svelte";

  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  import { t, langSignal } from "$lib/i18n/index.svelte";
  import { closePreview } from "$lib/state/infographicPreview.svelte";

  import { useInfographicsPage } from "./infographics.svelte";

  const info = useInfographicsPage(() => langSignal.current);

  const totalWorks = $derived(
    info.treemap.apartados.reduce((acc, item) => acc + item.value, 0),
  );

  $effect(() => {
    return () => {
      closePreview();
    };
  });
</script>

<div class="page">
  <h1>{t.infographics.title}</h1>

  <p class="page-intro">
    <RichText value={t.infographics.intro} />
  </p>

  <p class="page-intro">
    <RichText value={t.infographics.description} />
  </p>

  <section class="insights-header">
    <h2>
      {t.infographics.insights.totalWorks} | {totalWorks}
    </h2>
  </section>

  <section class="insights">
    <Treemap
      title={t.infographics.filters.apartados}
      data={info.treemap.apartados}
      getLabel={(k) => info.groupLabel(k, "apartado")}
    />

    <Treemap
      title={t.infographics.filters.mediums}
      data={info.treemap.mediums}
      getLabel={(k) => info.groupLabel(k, "medium")}
    />
  </section>

  <div class="toolbar">
    <button
      class="control featured-toggle"
      class:active={info.filters.onlyFeatured}
      aria-pressed={info.filters.onlyFeatured}
      onclick={() => (info.filters.onlyFeatured = !info.filters.onlyFeatured)}
    >
      <span class="star-icon">⭐</span>
      {info.filters.onlyFeatured
        ? t.infographics.featured.toggleShowAll
        : t.infographics.featured.toggleFeaturedOnly}
    </button>

    <input
      class="input"
      placeholder={t.infographics.searchPlaceholder}
      bind:value={info.filters.search}
    />

    <div class="filter-field">
      <label for="sort-filter" class="sr-only">
        {t.infographics.sort.label}
      </label>

      <select id="sort-filter" class="select" bind:value={info.filters.sortBy}>
        {#each info.sortOptions as opt (opt.value)}
          <option value={opt.value}>
            {t.infographics.sort[opt.key]}
          </option>
        {/each}
      </select>
    </div>

    <button
      class="control sort-dir"
      aria-label={info.filters.sortDir === "asc"
        ? "Orden ascendente"
        : "Orden descendente"}
      onclick={() =>
        (info.filters.sortDir =
          info.filters.sortDir === "asc" ? "desc" : "asc")}
    >
      {info.filters.sortDir === "asc" ? "↑" : "↓"}
    </button>
  </div>

  {#if info.filters.sortBy === "medium" || info.filters.sortBy === "apartado"}
    {#each info.grouped as group (group.key)}
      {@const currentType =
        info.filters.sortBy === "medium" ? "medium" : "apartado"}
      {@const currentTitle = info.groupLabel(group.key, currentType)}

      <h2 class="group-title">{currentTitle}</h2>

      <section class="infographics-grid grouped">
        {#each group.items as project, i (project.id)}
          <div
            class="animated-card"
            animate:flip={{ duration: 400, easing: cubicOut }}
            transition:fly={{ y: 10, duration: 200, easing: cubicOut }}
          >
            <InfographicCard {project} index={i} />
          </div>
        {/each}
      </section>
    {/each}
  {:else}
    <section class="infographics-grid">
      {#each info.filtered as project, i (project.id)}
        <div
          class="animated-card"
          animate:flip={{ duration: 350, easing: cubicOut }}
          transition:fly={{ y: 8, duration: 200, easing: cubicOut }}
        >
          <InfographicCard {project} index={i} />
        </div>
      {/each}
    </section>
  {/if}
</div>

<InfographicPreview />

<style>
  .infographics-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: var(--space-4);
  }

  .insights {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }

  .insights-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--space-6);
    margin-bottom: var(--space-3);
  }

  .insights-header h2 {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    margin: 0;
    font: var(--text-lg) var(--font-serif);
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-block: var(--space-6);
    padding: var(--space-3);
    background: var(--color-white);
    border: var(--card-border);
    border-radius: var(--radius-md);
    transition: transform var(--transition);
  }

  .toolbar:hover {
    transform: var(--hover-lift);
  }

  .toolbar input {
    flex: 1;
    background: transparent;
    outline: none;
  }

  .filter-field {
    display: flex;
    flex: 1;
  }

  .toolbar select {
    width: 100%;
    cursor: pointer;
    background: var(--color-white);
  }

  .toolbar button.control {
    background: var(--color-white);
    border: var(--border-1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color var(--transition),
      border-color var(--transition);
  }

  .toolbar button.featured-toggle {
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-3);
    font: inherit;
    font-size: var(--text-sm);
    white-space: nowrap;
    gap: var(--space-1);
  }

  .toolbar button.featured-toggle.active {
    background: var(--color-featured-bg);
    border-color: var(--color-featured-border);
    color: var(--color-text);
    font-weight: 600;
  }

  .star-icon {
    display: inline-block;
    font-size: var(--text-base);
  }

  .toolbar button.sort-dir {
    border-radius: var(--radius-sm);
    margin: 0;
    padding: var(--space-2) var(--space-3);
    font-weight: bold;
  }

  .group-title {
    font: var(--text-lg) var(--font-serif);
    margin: var(--space-8) 0 var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: var(--border-1);
  }

  .input,
  .select {
    padding: var(--space-3);
    border: var(--border-1);
    border-radius: var(--radius-md);
    font: inherit;
    color: var(--color-text);
    transition: border-color var(--transition);
  }

  @media (max-width: 768px) {
    .insights {
      grid-template-columns: 1fr;
      gap: var(--space-3);
    }

    .infographics-grid {
      grid-template-columns: 1fr;
      gap: var(--space-3);
    }

    .toolbar {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-2);
      padding: var(--space-3);
    }

    .toolbar input,
    .filter-field,
    .toolbar button.featured-toggle {
      width: 100%;
    }

    .toolbar input,
    .toolbar select {
      font-size: var(--text-sm);
    }
  }
</style>
