<script lang="ts">
  import InfographicCard from "$lib/components/infographics/InfographicCard.svelte";
  import Treemap from "$lib/components/visualizations/Treemap.svelte";
  import InfographicPreview from "$lib/components/infographics/InfographicPreview.svelte";

  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  import { t, lang } from "$lib/i18n";
  import { APARTADOS } from "$lib/config/apartados.config";

  import { useInfographicsPage } from "$lib/infographics/useInfographicsPage";

  type ApartadoKey = keyof typeof APARTADOS;

  // IMPORTANTE: No desestructuramos 'filtered' ni 'grouped' aquí
  // porque son getters. Si los desestructuramos, capturamos su valor inicial.
  const info = useInfographicsPage(() => $lang, $t);

  // Las constantes estáticas o funciones sí podemos desestructurarlas si prefieres
  const { sortOptions, labelApartado, labelMedium, groupLabel, treemap } = info;
  const { filters } = info;
</script>

<main class="page">
  <h1>{$t.infographics.title}</h1>

  <!-- INTRO -->
  <p class="page-intro">
    {#each $t.infographics.intro as node}
      {#if typeof node === "string"}
        {node}
      {:else if node.bold}
        <strong>{node.text}</strong>
      {:else if node.italic}
        <em>{node.text}</em>
      {:else}
        {node.text}
      {/if}
    {/each}
  </p>

  <p class="page-intro">
    {#each $t.infographics.description as node}
      {#if typeof node === "string"}
        {node}
      {:else if node.bold}
        <strong>{node.text}</strong>
      {:else if node.italic}
        <em>{node.text}</em>
      {:else}
        {node.text}
      {/if}
    {/each}
  </p>

  <!-- INSIGHTS -->
  <section class="insights">
    <Treemap
      data={treemap.apartados}
      getLabel={(k) => labelApartado(k as ApartadoKey)}
    />

    <Treemap data={treemap.mediums} getLabel={labelMedium} />
  </section>

  <!-- TOOLBAR -->
  <div class="toolbar">
    <input
      class="input"
      placeholder={$t.infographics.searchPlaceholder}
      bind:value={filters.search}
    />

    <select class="select" bind:value={filters.sortBy}>
      {#each sortOptions as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>

    <button
      class="control sort-dir"
      aria-label="Cambiar orden"
      onclick={() =>
        (filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc")}
    >
      {filters.sortDir === "asc" ? "↑" : "↓"}
    </button>
  </div>

  <!-- GROUPED (Accedemos vía info.grouped) -->
  {#if filters.sortBy === "medium" || filters.sortBy === "apartado"}
    {#each info.grouped as group (group.key)}
      <h2 class="group-title">
        {groupLabel(
          group.key,
          filters.sortBy === "medium" ? "medium" : "apartado",
        )}
      </h2>

      <section class="infographics-grid grouped">
        {#each group.items as project (project.id)}
          <div
            animate:flip={{ duration: 400, easing: cubicOut }}
            transition:fly={{ y: 10, duration: 200, easing: cubicOut }}
          >
            <InfographicCard {project} />
          </div>
        {/each}
      </section>
    {/each}
  {:else}
    <!-- LISTA SIMPLE (Accedemos vía info.filtered) -->
    <section class="infographics-grid">
      {#each info.filtered as project (project.id)}
        <div
          animate:flip={{ duration: 350, easing: cubicOut }}
          transition:fly={{ y: 8, duration: 200, easing: cubicOut }}
        >
          <InfographicCard {project} />
        </div>
      {/each}
    </section>
  {/if}
</main>

<InfographicPreview />
