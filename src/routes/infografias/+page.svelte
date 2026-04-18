<script lang="ts">
  import { infographics } from "$lib/data/infographics";
  import type { Infographic } from "$lib/data/infographics";
  import InfographicCard from "$lib/components/InfographicCard.svelte";
  import { lang } from "$lib/i18n/lang";
  import "$lib/styles/infographics.css";

  type Filters = {
    search: string;
    apartados: string[];
    mediums: string[];
    sort: "date" | "title" | "apartado" | "medium";
  };

  // 📦 DATA (YA MERGEADA)
  const allInfografias = $derived.by(() => infographics);

  // 🧠 STATE
  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sort: "date",
  });

  // 🔹 APARTADOS
  const uniqueApartados = $derived.by(() => {
    return [
      ...new Set(
        allInfografias
          .map((p) => p.apartadoKey)
          .filter((v): v is string => Boolean(v))
      ),
    ];
  });

  // 🔹 MEDIUMS
  const uniqueMediums = $derived.by(() => {
    return [
      ...new Set(
        allInfografias
          .map((p) => p.medium?.[$lang])
          .filter((v): v is string => Boolean(v))
      ),
    ];
  });

  // 🔥 FILTER PIPELINE
  const filteredProjects = $derived.by(() => {
    let result = [...allInfografias];

    const q = filters.search.trim().toLowerCase();

    // 🔍 SEARCH
    if (q) {
      result = result.filter((p) =>
        p.title[$lang].toLowerCase().includes(q) ||
        p.apartadoKey?.toLowerCase().includes(q) ||
        p.medium?.[$lang]?.toLowerCase().includes(q)
      );
    }

    // 🎯 APARTADOS
    if (filters.apartados.length) {
      result = result.filter((p) =>
        p.apartadoKey ? filters.apartados.includes(p.apartadoKey) : false
      );
    }

    // 📰 MEDIUMS
    if (filters.mediums.length) {
      result = result.filter((p) =>
        p.medium ? filters.mediums.includes(p.medium[$lang]) : false
      );
    }

    // 🔽 SORT
    result.sort((a, b) => {
      switch (filters.sort) {
        case "date":
          return (b.date ?? "").localeCompare(a.date ?? "");

        case "title":
          return a.title[$lang].localeCompare(b.title[$lang]);

        case "apartado":
          return (a.apartadoKey ?? "").localeCompare(b.apartadoKey ?? "");

        case "medium":
          return (a.medium?.[$lang] ?? "").localeCompare(
            b.medium?.[$lang] ?? ""
          );

        default:
          return 0;
      }
    });

    return result;
  });

  // 🔁 TOGGLES
  const toggleApartado = (key: string) => {
    filters.apartados = filters.apartados.includes(key)
      ? filters.apartados.filter((k) => k !== key)
      : [...filters.apartados, key];
  };

  const toggleMedium = (m: string) => {
    filters.mediums = filters.mediums.includes(m)
      ? filters.mediums.filter((x) => x !== m)
      : [...filters.mediums, m];
  };
</script>

<div class="layout">
  <h1>Infografías</h1>

  <!-- TOOLBAR -->
  <div class="toolbar">
    <input
      type="text"
      placeholder={$lang === "es" ? "Buscar..." : "Search..."}
      bind:value={filters.search}
    />

    <select bind:value={filters.sort}>
      <option value="date">
        {$lang === "es" ? "Más recientes" : "Newest"}
      </option>
      <option value="title">A-Z</option>
      <option value="apartado">
        {$lang === "es" ? "Apartado" : "Section"}
      </option>
      <option value="medium">Medium</option>
    </select>
  </div>

  <!-- FILTERS -->
  <div class="filters">
    <div class="filter-group">
      <span>Apartados:</span>
      {#each uniqueApartados as ap}
        <button
          class:active={filters.apartados.includes(ap)}
          onclick={() => toggleApartado(ap)}
        >
          {ap}
        </button>
      {/each}
    </div>

    <div class="filter-group">
      <span>Medios:</span>
      {#each uniqueMediums as m}
        <button
          class:active={filters.mediums.includes(m)}
          onclick={() => toggleMedium(m)}
        >
          {m}
        </button>
      {/each}
    </div>
  </div>

  <!-- GRID -->
  <section class="infographics-grid">
    {#each filteredProjects as project}
      <InfographicCard project={project} />
    {/each}
  </section>
</div>