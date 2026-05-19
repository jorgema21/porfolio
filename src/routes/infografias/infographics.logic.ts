import { infographics } from "$lib/data/infographics.data";
import type { Infographic } from "./infographics.metrics";

export type Lang = "es" | "en";
export type SortBy = "date" | "title" | "apartado" | "medium";
export type SortDir = "asc" | "desc";

export type Filters = {
  search: string;
  apartados: string[];
  mediums: string[];
  sortBy: SortBy;
  sortDir: SortDir;
};

export const getDirection = (dir: SortDir): number => (dir === "asc" ? 1 : -1);

const sorters = {
  date: (a: Infographic, b: Infographic) => {
    const tA = a.date ? Date.parse(a.date) : 0;
    const tB = b.date ? Date.parse(b.date) : 0;
    return tB - tA; // Más reciente primero por defecto
  },
  apartado: (a: Infographic, b: Infographic) =>
    (a.apartado ?? "").localeCompare(b.apartado ?? ""),
  medium: (a: Infographic, b: Infographic) =>
    (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
};

export function getFilteredList(filters: Filters, lang: Lang): Infographic[] {
  const q = filters.search.trim().toLowerCase();

  // 1. Filtrado en una sola pasada de CPU
  const list = infographics.filter((p) => {
    const matchSearch = !q || p.title[lang].toLowerCase().includes(q);

    const matchApartado =
      !filters.apartados.length ||
      (p.apartado && filters.apartados.includes(p.apartado));

    const matchMedium =
      !filters.mediums.length ||
      (p.mediumKey && filters.mediums.includes(p.mediumKey));

    return matchSearch && matchApartado && matchMedium;
  });

  if (filters.sortBy === "apartado" || filters.sortBy === "medium") {
    return list;
  }

  const direction = getDirection(filters.sortDir);

  if (filters.sortBy === "title") {
    return [...list].sort(
      (a, b) => a.title[lang].localeCompare(b.title[lang]) * direction,
    );
  }

  const currentSortKey = filters.sortBy as Exclude<
    SortBy,
    "title" | "apartado" | "medium"
  >;

  return [...list].sort((a, b) => sorters[currentSortKey](a, b) * direction);
}
