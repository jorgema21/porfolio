<script lang="ts">
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import Treemap from "$lib/components/visualizations/Treemap.svelte";
  import "$lib/styles/infographics.css";

  import { t, lang } from "$lib/i18n";
  import { APARTADOS } from "$lib/config/apartados.config";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

  import { getTreemapData } from "$lib/infographics/infographics.metrics";
  import { createInfographicsState } from "$lib/infographics/infographics.state.svelte";

  type ApartadoKey = keyof typeof APARTADOS;

  const { filters, filtered } = createInfographicsState(() => $lang);

  const treemap = getTreemapData();

  const label = {
    apartado: (k: ApartadoKey) => APARTADOS[k].label[$lang],

    medium: (k: string) =>
      (infographicsI18n[$lang].mediums as Record<string, string>)[k] ?? k,
  };

  const sortOptions = [
    { value: "date", label: () => $t.infographics.sort.newest },
    { value: "title", label: () => $t.infographics.sort.title },
    { value: "apartado", label: () => $t.infographics.sort.section },
    { value: "medium", label: () => $t.infographics.sort.medium },
  ] as const;
</script>

<div class="page">
  <h1>{$t.infographics.title}</h1>

  <section class="insights">
    <Treemap
      data={treemap.apartados}
      getLabel={(k) => label.apartado(k as ApartadoKey)}
    />

    <Treemap data={treemap.mediums} getLabel={(k) => label.medium(k)} />
  </section>

  <div class="toolbar">
    <input
      placeholder={$t.infographics.searchPlaceholder}
      bind:value={filters.search}
    />

    <select bind:value={filters.sortBy}>
      {#each sortOptions as opt}
        <option value={opt.value}>{opt.label()}</option>
      {/each}
    </select>

    <button
      onclick={() =>
        (filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc")}
    >
      {filters.sortDir === "asc" ? "↓" : "↑"}
    </button>
  </div>

  <section class="infographics-grid">
    {#each filtered() as project (project.id)}
      <InfographicCard {project} />
    {/each}
  </section>
</div>
