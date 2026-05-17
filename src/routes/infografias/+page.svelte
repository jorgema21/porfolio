<script lang="ts">
  import InfographicCard from "$lib/components/infographics/InfographicCard.svelte";
  import Treemap from "$lib/components/visualizations/Treemap.svelte";
  import InfographicPreview from "$lib/components/infographics/InfographicPreview.svelte";
  import RichText from "$lib/components/writing/RichText.svelte";

  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  import { t, lang } from "$lib/i18n";
  import { APARTADOS } from "$lib/config/apartados.config";

  import { useInfographicsPage } from "$lib/infographics/useInfographicsPage";

  type ApartadoKey = keyof typeof APARTADOS;

  // Inicialización del estado reactivo de la página
  const info = useInfographicsPage(() => $lang);

  // Desestructuramos SOLO los métodos estáticos, objetos mutables y configuraciones.
  // Dejamos fuera 'filtered' y 'grouped' para no romper sus getters reactivos.
  const {
    filters,
    sortOptions,
    labelApartado,
    labelMedium,
    groupLabel,
    treemap,
  } = $state(info);
</script>

<main class="page">
  <h1>{$t.infographics.title}</h1>

  <!-- INTRO -->
  <p class="page-intro">
    <RichText value={$t.infographics.intro} />
  </p>

  <p class="page-intro">
    <RichText value={$t.infographics.description} />
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
      {#each sortOptions as opt (opt.value)}
        <option value={opt.value}>
          {$t.infographics.sort[opt.key]}
        </option>
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

  <!-- GROUPED -->
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
    <!-- LISTA SIMPLE -->
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
