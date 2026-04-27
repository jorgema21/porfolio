<script lang="ts">
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import Treemap from "$lib/components/visualizations/Treemap.svelte";
  import "$lib/styles/infographics.css";

  import { t, lang } from "$lib/i18n";
  import { APARTADOS } from "$lib/config/apartados.config";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

  import { getTreemapData } from "$lib/infographics/infographics.metrics";
  import { createInfographicsState } from "$lib/infographics/infographics.state.svelte";

  import InfographicPreview from "$lib/components/InfographicPreview.svelte";

  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  type ApartadoKey = keyof typeof APARTADOS;

  const { filters, filtered, grouped } = createInfographicsState(() => $lang);
  const treemap = getTreemapData();

  const label = {
    apartado: (k: ApartadoKey) => APARTADOS[k].label[$lang],
    medium: (k: string) =>
      (infographicsI18n[$lang].mediums as Record<string, string>)[k] ?? k,
  };

  const groupLabel = (key: string, type: "medium" | "apartado") => {
    if (type === "medium") {
      return (
        (infographicsI18n[$lang].mediums as Record<string, string>)[key] ?? key
      );
    }

    return APARTADOS[key as ApartadoKey]?.label[$lang] ?? key;
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

  <p class="page-intro">
    {#each $t.infographics.intro as line, i}
      {line}
      {#if i !== $t.infographics.intro.length - 1}
        <br />
      {/if}
    {/each}
  </p>

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
      class="control sort-dir"
      aria-label="Cambiar orden"
      onclick={() =>
        (filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc")}
    >
      {filters.sortDir === "asc" ? "↑" : "↑"}
    </button>
  </div>

  {#if filters.sortBy === "medium" || filters.sortBy === "apartado"}
    {#each grouped() as group (group.key)}
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
    <section class="infographics-grid">
      {#each filtered() as project (project.id)}
        <div
          animate:flip={{ duration: 350, easing: cubicOut }}
          transition:fly={{ y: 8, duration: 200, easing: cubicOut }}
        >
          <InfographicCard {project} />
        </div>
      {/each}
    </section>
  {/if}
</div>

<InfographicPreview />
