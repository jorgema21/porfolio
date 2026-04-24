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

  /* =========================
     TYPE GUARDS
  ========================= */

  const isDefined = <T>(v: T | undefined | null): v is T =>
    v !== undefined && v !== null;

  /* =========================
     UTILS
  ========================= */

  const countBy = <T, K extends string>(
    items: T[],
    getKey: (item: T) => K | null | undefined
  ) => {
    const map = new Map<K, number>();

    for (const item of items) {
      const key = getKey(item);
      if (!key) continue;
      map.set(key, (map.get(key) ?? 0) + 1);
    }

    return [...map.entries()]
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value);
  };

  const toggle = <T,>(arr: T[], key: T) =>
    arr.includes(key) ? arr.filter((x) => x !== key) : [...arr, key];

  const label = {
    apartado: (k: ApartadoKey) => APARTADOS[k].label[$lang],
    medium: (k: MediumKey) =>
      infographicsI18n[$lang].mediums[k] ?? k,
  };

  const sorters = {
    date: (a: Infographic, b: Infographic) =>
      (b.date ? +new Date(b.date) : 0) -
      (a.date ? +new Date(a.date) : 0),

    title: (a: Infographic, b: Infographic) =>
      a.title[$lang].localeCompare(b.title[$lang]),

    apartado: (a: Infographic, b: Infographic) =>
      (a.apartado ?? "").localeCompare(b.apartado ?? ""),

    medium: (a: Infographic, b: Infographic) =>
      (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
  };

  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "desc",
  });

  const dir = () => (filters.sortDir === "asc" ? 1 : -1);

  /* =========================
     TREEMAP DATA
  ========================= */

  const apartadosData = countBy(all, (p) => p.apartado);
  const mediumsData = countBy(all, (p) => p.mediumKey);

  /* =========================
     UNIQUE VALUES (FIXED TS STRICT MODE)
  ========================= */

  const apartados = [
    ...new Set(all.map((p) => p.apartado).filter(isDefined)),
  ] as ApartadoKey[];

  const mediums = [
    ...new Set(all.map((p) => p.mediumKey).filter(isDefined)),
  ] as MediumKey[];

  /* =========================
     FILTERED DATA
  ========================= */

  const filtered = $derived.by(() => {
    const q = filters.search.trim().toLowerCase();

    return all
      .filter((p) => {
        const matchSearch =
          !q || p.title[$lang].toLowerCase().includes(q);

        const matchApartado =
          !filters.apartados.length ||
          (p.apartado && filters.apartados.includes(p.apartado));

        const matchMedium =
          !filters.mediums.length ||
          (p.mediumKey &&
            filters.mediums.includes(p.mediumKey as MediumKey));

        return matchSearch && matchApartado && matchMedium;
      })
      .sort((a, b) => sorters[filters.sortBy](a, b) * dir());
  });

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
        (filters.sortDir =
          filters.sortDir === "asc" ? "desc" : "asc")}
    >
      {filters.sortDir === "asc" ? "↓" : "↑"}
    </button>
  </div>

  <section class="insights">
    <Treemap
      data={apartadosData}
      getLabel={(k) => label.apartado(k as ApartadoKey)}
    />

    <Treemap
      data={mediumsData}
      getLabel={(k) => label.medium(k as MediumKey)}
    />
  </section>

  <div class="filters">
    <div class="filter-group">
      <span>{$t.infographics.filters.apartados}</span>

      {#each apartados as ap}
        <button
          class:active={filters.apartados.includes(ap)}
          onclick={() =>
            (filters.apartados = toggle(filters.apartados, ap))}
        >
          {label.apartado(ap)}
        </button>
      {/each}
    </div>

    <div class="filter-group">
      <span>{$t.infographics.filters.mediums}</span>

      {#each mediums as m}
        <button
          class:active={filters.mediums.includes(m)}
          onclick={() =>
            (filters.mediums = toggle(filters.mediums, m))}
        >
          {label.medium(m)}
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