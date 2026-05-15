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

const createSorters = (lang: Lang) => ({
  date: (a: Infographic, b: Infographic) => {
    const tA = a.date ? Date.parse(a.date) : 0;
    const tB = b.date ? Date.parse(b.date) : 0;
    return tB - tA;
  },
  title: (a: Infographic, b: Infographic) =>
    a.title[lang].localeCompare(b.title[lang]),
  apartado: (a: Infographic, b: Infographic) =>
    (a.apartado ?? "").localeCompare(b.apartado ?? ""),
  medium: (a: Infographic, b: Infographic) =>
    (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
});

export function getFilteredList(filters: Filters, lang: Lang): Infographic[] {
  const q = filters.search.trim().toLowerCase();

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

  // Si se agrupa, delegamos el ordenamiento completo a los selectores
  if (filters.sortBy === "apartado" || filters.sortBy === "medium") {
    return list;
  }

  const sorters = createSorters(lang);

  return [...list].sort(
    (a, b) => sorters[filters.sortBy](a, b) * getDirection(filters.sortDir),
  );
}
