<script lang="ts">
  import { infographics } from "$lib/data/infographics.data";
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import { lang, t } from "$lib/i18n";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import "$lib/styles/infographics.css";
  import Treemap from "$lib/components/visualizations/Treemap.svelte";

  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";

  type Infographic = (typeof infographics)[number];

  type MediumKey = keyof typeof infographicsI18n.es.mediums;

  type Filters = {
    search: string;
    apartados: ApartadoKey[];
    mediums: MediumKey[];
    sortBy: "date" | "title" | "apartado" | "medium";
    sortDir: "asc" | "desc";
  };

  const all: Infographic[] = infographics;

  const countBy = <K extends string>(
    items: Infographic[],
    getKey: (item: Infographic) => K | null | undefined,
  ) => {
    const map = new Map<K, number>();

    for (const item of items) {
      const key = getKey(item);
      if (!key) continue;

      map.set(key, (map.get(key) ?? 0) + 1);
    }

    return Array.from(map, ([key, value]) => ({ key, value })).sort(
      (a, b) => b.value - a.value,
    );
  };

  const apartadosData = countBy(all, (p) => p.apartado);
  const mediumsData = countBy(all, (p) => p.mediumKey);

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
    arr.includes(key) ? arr.filter((x) => x !== key) : [...arr, key];

  const dirFactor = () => (filters.sortDir === "asc" ? 1 : -1);

  /* =========================
     UNIQUE VALUES
  ========================= */

  const apartados = Array.from(
    new Set(all.map((p) => p.apartado).filter(Boolean)),
  ) as ApartadoKey[];

  const mediums = Array.from(
    new Set(all.map((p) => p.mediumKey).filter(Boolean)),
  ) as MediumKey[];

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
          (p.mediumKey && filters.mediums.includes(p.mediumKey as MediumKey)),
      )
      .sort((a, b) => {
        const getDate = (x: Infographic) =>
          x.date ? new Date(x.date).getTime() : 0;

        const comparators = {
          date: () => getDate(b) - getDate(a),
          title: () => a.title[$lang].localeCompare(b.title[$lang]),
          apartado: () => (a.apartado ?? "").localeCompare(b.apartado ?? ""),
          medium: () => (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
        };

        return comparators[filters.sortBy]() * dir;
      });
  });

  /* =========================
     LABELS
  ========================= */

  const getApartadoLabel = (key: ApartadoKey) => APARTADOS[key].label[$lang];

  const getMediumLabel = (key: MediumKey) =>
    infographicsI18n[$lang].mediums[key] ?? key;

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
  <section class="insights">
    <Treemap
      data={apartadosData}
      getLabel={(key) => getApartadoLabel(key as ApartadoKey)}
    />

    <Treemap
      data={mediumsData}
      getLabel={(key) => getMediumLabel(key as MediumKey)}
    />
  </section>
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
