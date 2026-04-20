<script lang="ts">
  import { infographics } from "$lib/data/infographics.data";
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import { lang, t } from "$lib/i18n";
  import "$lib/styles/infographics.css";

  type Filters = {
    search: string;
    apartados: string[];
    mediums: string[];
    sort: "date" | "title" | "apartado" | "medium";
  };

  const allInfografias = $derived.by(() => infographics);

  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sort: "date",
  });

  /* =========================
     KEYS (SAFE)
  ========================= */

  const uniqueApartados = $derived.by(() =>
    Array.from(
      new Set(
        allInfografias
          .map((p) => p.apartadoKey)
          .filter((v): v is string => typeof v === "string"),
      ),
    ),
  );

  const uniqueMediums = $derived.by(() =>
    Array.from(
      new Set(
        allInfografias
          .map((p) => p.mediumKey)
          .filter((v): v is string => typeof v === "string"),
      ),
    ),
  );

  /* =========================
     FILTER
  ========================= */

  const filteredProjects = $derived.by(() => {
    const q = filters.search.trim().toLowerCase();

    return allInfografias
      .filter((p) => !q || p.title[$lang].toLowerCase().includes(q))
      .filter(
        (p) =>
          !filters.apartados.length ||
          (p.apartadoKey && filters.apartados.includes(p.apartadoKey)),
      )
      .filter(
        (p) =>
          !filters.mediums.length ||
          (p.mediumKey && filters.mediums.includes(p.mediumKey)),
      )
      .sort((a, b) => {
        switch (filters.sort) {
          case "date":
            return (b.date ?? "").localeCompare(a.date ?? "");

          case "title":
            return a.title[$lang].localeCompare(b.title[$lang]);

          case "apartado":
            return (a.apartadoKey ?? "").localeCompare(b.apartadoKey ?? "");

          case "medium":
            return (a.mediumKey ?? "").localeCompare(b.mediumKey ?? "");

          default:
            return 0;
        }
      });
  });

  /* =========================
     TOGGLES
  ========================= */

  const toggle = (arr: string[], key: string) =>
    arr.includes(key) ? arr.filter((x) => x !== key) : [...arr, key];

  const toggleApartado = (key: string) => {
    filters.apartados = toggle(filters.apartados, key);
  };

  const toggleMedium = (key: string) => {
    filters.mediums = toggle(filters.mediums, key);
  };

  /* =========================
     LABELS (CORRECTO)
  ========================= */

  type InfographicsDict = typeof $t.infographics;

  const getApartadoLabel = (key: string) => {
    const dict = $t.infographics.apartados as InfographicsDict["apartados"];
    return dict?.[key as keyof typeof dict] ?? key;
  };

  const getMediumLabel = (key: string) => {
    const dict = $t.infographics.mediums as InfographicsDict["mediums"];
    return dict?.[key as keyof typeof dict] ?? key;
  };
</script>

<div class="layout">
  <h1>{$t.infographics.title}</h1>

  <div class="toolbar">
    <input
      type="text"
      placeholder={$t.infographics.searchPlaceholder}
      bind:value={filters.search}
    />

    <select bind:value={filters.sort}>
      <option value="date">{$t.infographics.sort.newest}</option>
      <option value="title">{$t.infographics.sort.title}</option>
      <option value="apartado">{$t.infographics.sort.section}</option>
      <option value="medium">{$t.infographics.sort.medium}</option>
    </select>
  </div>

  <div class="filters">
    <div class="filter-group">
      <span>{$t.infographics.filters.apartados}</span>

      {#each uniqueApartados as ap (ap)}
        <button
          class:active={filters.apartados.includes(ap)}
          onclick={() => toggleApartado(ap)}
        >
          {getApartadoLabel(ap)}
        </button>
      {/each}
    </div>

    <div class="filter-group">
      <span>{$t.infographics.filters.mediums}</span>

      {#each uniqueMediums as m (m)}
        <button
          class:active={filters.mediums.includes(m)}
          onclick={() => toggleMedium(m)}
        >
          {getMediumLabel(m)}
        </button>
      {/each}
    </div>
  </div>

  <section class="infographics-grid">
    {#each filteredProjects as project (project.id)}
      <InfographicCard {project} />
    {/each}
  </section>
</div>
