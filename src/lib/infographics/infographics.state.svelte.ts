import { infographics } from "$lib/data/infographics.data";
import type { Infographic } from "./infographics.metrics";

export type MediumKey = string;
export type ApartadoKey = string;

type Filters = {
  search: string;
  apartados: ApartadoKey[];
  mediums: MediumKey[];
  sortBy: "date" | "title" | "apartado" | "medium";
  sortDir: "asc" | "desc";
};

/* =========================
   SORTERS
========================= */

const sorters = (lang: "es" | "en") => ({
  date: (a: Infographic, b: Infographic) =>
    (b.date ? +new Date(b.date) : 0) -
    (a.date ? +new Date(a.date) : 0),

  title: (a: Infographic, b: Infographic) =>
    a.title[lang].localeCompare(b.title[lang]),

  apartado: (a: Infographic, b: Infographic) =>
    (a.apartado ?? "").localeCompare(b.apartado ?? ""),

  medium: (a: Infographic, b: Infographic) =>
    (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
});

const dir = (f: Filters) => (f.sortDir === "asc" ? 1 : -1);

/* =========================
   STATE
========================= */

export const createInfographicsState = (lang: () => "es" | "en") => {
  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "desc",
  });

  const filtered = $derived(() => {
    const l = lang();
    const q = filters.search.trim().toLowerCase();

    return infographics
      .filter((p) => {
        const matchSearch =
          !q || p.title[l].toLowerCase().includes(q);

        const matchApartado =
          !filters.apartados.length ||
          (p.apartado && filters.apartados.includes(p.apartado));

        const matchMedium =
          !filters.mediums.length ||
          (p.mediumKey && filters.mediums.includes(p.mediumKey));

        return matchSearch && matchApartado && matchMedium;
      })
      .sort((a, b) =>
        sorters(l)[filters.sortBy](a, b) * dir(filters)
      );
  });

  /* =========================
     GROUPED VIEW
  ========================= */

  const grouped = $derived(() => {
    const list = filtered();
    const sort = filters.sortBy;

    if (sort !== "medium" && sort !== "apartado") {
      return null;
    }

    const groups = new Map<string, Infographic[]>();

    for (const item of list) {
      const key =
        sort === "medium"
          ? item.mediumKey ?? "unknown"
          : item.apartado ?? "unknown";

      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    }

    return Array.from(groups.entries()).map(([key, items]) => ({
      key,
      items,
    }));
  });

  return { filters, filtered, grouped };
};