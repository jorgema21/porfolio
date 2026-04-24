<script lang="ts">
  import { infographics } from "$lib/data/infographics.data";
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import { lang, t } from "$lib/i18n";
  import "$lib/styles/infographics.css";

  import type { ApartadoKey } from "$lib/config/apartados.config";
  import { APARTADOS } from "$lib/config/apartados.config";

  type MediumKey = keyof typeof $t.infographics.mediums;

  type Filters = {
    search: string;
    apartados: ApartadoKey[];
    mediums: string[];
    sortBy: "date" | "title" | "apartado" | "medium";
    sortDir: "asc" | "desc";
  };

  const allInfografias = $derived.by(() => infographics);

  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "desc",
  });

  /* =========================
     KEYS (SAFE)
  ========================= */

  const uniqueApartados = $derived.by(() =>
    Array.from(
      new Set(
        allInfografias
          .map((p) => p.apartado)
          .filter((v): v is ApartadoKey => v !== undefined),
      ),
    ),
  );

  const uniqueMediums = $derived.by(() =>
    Array.from(
      new Set(
        allInfografias
          .map((p) => p.mediumKey)
          .filter((v): v is string => v !== undefined),
      ),
    ),
  );

  /* =========================
     FILTER
  ========================= */

  const filteredProjects = $derived.by(() => {
    const q = filters.search.trim().toLowerCase();

    const dir = filters.sortDir === "asc" ? 1 : -1;

    return allInfografias
      .filter((p) => !q || p.title[$lang].toLowerCase().includes(q))
      .filter(
        (p) =>
          !filters.apartados.length ||
          (p.apartado !== undefined && filters.apartados.includes(p.apartado)),
      )
      .filter(
        (p) =>
          !filters.mediums.length ||
          (p.mediumKey !== undefined && filters.mediums.includes(p.mediumKey)),
      )
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;

        switch (filters.sortBy) {
          case "date":
            return (dateB - dateA) * dir;

          case "title":
            return a.title[$lang].localeCompare(b.title[$lang]) * dir;

          case "apartado":
            return (a.apartado ?? "").localeCompare(b.apartado ?? "") * dir;

          case "medium":
            return (a.mediumKey ?? "").localeCompare(b.mediumKey ?? "") * dir;

          default:
            return 0;
        }
      });
  });

  /* =========================
     TOGGLES
  ========================= */

  const toggle = <T,>(arr: T[], key: T): T[] =>
    arr.includes(key) ? arr.filter((x) => x !== key) : [...arr, key];

  const toggleApartado = (key: ApartadoKey) => {
    filters.apartados = toggle(filters.apartados, key);
  };

  const toggleMedium = (key: string) => {
    filters.mediums = toggle(filters.mediums, key);
  };

  const toggleSortDir = () => {
    filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc";
  };

  /* =========================
     LABELS (FINAL CLEAN)
  ========================= */

  const getApartadoLabel = (key: ApartadoKey) => {
    return APARTADOS[key].label[$lang];
  };

  const getMediumLabel = (key: string) => {
    const mediums = $t.infographics.mediums;

    if (key in mediums) {
      return mediums[key as keyof typeof mediums];
    }

    return key;
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

    <select bind:value={filters.sortBy}>
      <option value="date">Fecha</option>
      <option value="title">Título</option>
      <option value="apartado">Sección</option>
      <option value="medium">Medio</option>
    </select>

    <button
      class="sort-dir"
      onclick={toggleSortDir}
      aria-label="Cambiar dirección de orden"
    >
      {filters.sortDir === "asc" ? "↓" : "↑"}
    </button>
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
