<script lang="ts">
  import { infographics } from "$lib/data/infographics.data";
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import { lang, t } from "$lib/i18n";
  import "$lib/styles/infographics.css";

  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";

  type Filters = {
    search: string;
    apartados: ApartadoKey[];
    mediums: string[];
    sortBy: "date" | "title" | "apartado" | "medium";
    sortDir: "asc" | "desc";
  };

  const all = infographics;

  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "desc",
  });

  /* =========================
     HELPERS
  ========================= */

  const toggle = <T,>(arr: T[], key: T): T[] =>
    arr.includes(key) ? arr.filter((x: T) => x !== key) : [...arr, key];

  const dirFactor = () => (filters.sortDir === "asc" ? 1 : -1);

  /* =========================
     UNIQUE VALUES
  ========================= */

  const apartados = Array.from(
    new Set(all.map((p) => p.apartado).filter(Boolean)),
  ) as ApartadoKey[];

  const mediums = Array.from(
    new Set(all.map((p) => p.mediumKey).filter(Boolean)),
  ) as string[];

  /* =========================
     FILTER + SORT
  ========================= */

  const filtered = $derived.by(() => {
    const q = filters.search.trim().toLowerCase();
    const dir = dirFactor();

    return all
      .filter((p) => !q || p.title[$lang].toLowerCase().includes(q))
      .filter(
        (p) =>
          !filters.apartados.length ||
          (p.apartado && filters.apartados.includes(p.apartado)),
      )
      .filter(
        (p) =>
          !filters.mediums.length ||
          (p.mediumKey && filters.mediums.includes(p.mediumKey)),
      )
      .sort((a, b) => {
        const getDate = (x: typeof a) =>
          x.date ? new Date(x.date).getTime() : 0;

        const compare = {
          date: () => getDate(b) - getDate(a),
          title: () => a.title[$lang].localeCompare(b.title[$lang]),
          apartado: () => (a.apartado ?? "").localeCompare(b.apartado ?? ""),
          medium: () => (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
        }[filters.sortBy];

        return compare() * dir;
      });
  });

  /* =========================
     LABELS
  ========================= */

  const getApartadoLabel = (key: ApartadoKey) => APARTADOS[key].label[$lang];

  const getMediumLabel = (key: string) => key;

  const sortOptions = [
    { value: "date", label: () => $t.infographics.sort.newest },
    { value: "title", label: () => $t.infographics.sort.title },
    { value: "apartado", label: () => $t.infographics.sort.section },
    { value: "medium", label: () => $t.infographics.sort.medium },
  ] as const;
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
      {#each sortOptions as opt}
        <option value={opt.value}>{opt.label()}</option>
      {/each}
    </select>

    <button
      class="sort-dir"
      onclick={() =>
        (filters.sortDir = filters.sortDir === "asc" ? "desc" : "asc")}
    >
      {filters.sortDir === "asc" ? "↓" : "↑"}
    </button>
  </div>

  <div class="filters">
    <div class="filter-group">
      <span>{$t.infographics.filters.apartados}</span>

      {#each apartados as ap}
        <button
          class:active={filters.apartados.includes(ap)}
          onclick={() => (filters.apartados = toggle(filters.apartados, ap))}
        >
          {getApartadoLabel(ap)}
        </button>
      {/each}
    </div>

    <div class="filter-group">
      <span>{$t.infographics.filters.mediums}</span>

      {#each mediums as m}
        <button
          class:active={filters.mediums.includes(m)}
          onclick={() => (filters.mediums = toggle(filters.mediums, m))}
        >
          {getMediumLabel(m)}
        </button>
      {/each}
    </div>
  </div>

  <section class="infographics-grid">
    {#each filtered as project (project.id)}
      <InfographicCard {project} />
    {/each}
  </section>
</div>
