import { infographics } from "$lib/data/infographics.data";
import { APARTADOS } from "$lib/config/apartados.config";
import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";

export type Lang = "es" | "en";
export type SortBy = "date" | "title" | "apartado" | "medium";
export type SortDir = "asc" | "desc";
export type Infographic = (typeof infographics)[number];

export type Filters = {
  search: string;
  apartados: string[];
  mediums: string[];
  sortBy: SortBy;
  sortDir: SortDir;
};

export interface GroupedInfographics {
  key: string;
  items: Infographic[];
}

const getDirection = (dir: SortDir): number => (dir === "asc" ? 1 : -1);

const sorters = {
  date: (a: Infographic, b: Infographic) =>
    Date.parse(b.date || "0") - Date.parse(a.date || "0"),
  apartado: (a: Infographic, b: Infographic) =>
    (a.apartado ?? "").localeCompare(b.apartado ?? ""),
  medium: (a: Infographic, b: Infographic) =>
    (a.mediumKey ?? "").localeCompare(b.mediumKey ?? ""),
};

const countBy = <T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K | null | undefined,
) => {
  const map = new Map<K, number>();
  for (const item of items) {
    const key = getKey(item);
    if (key === null || key === undefined || key === "") continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map, ([key, value]) => ({ key, value })).sort(
    (a, b) => b.value - a.value,
  );
};

export function useInfographicsPage(lang: () => Lang) {
  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "asc",
  });

  const treemap = {
    apartados: countBy(infographics, (p) => p.apartado),
    mediums: countBy(infographics, (p) => p.mediumKey),
  };

  const mediumDict = $derived(() => infographicsI18n[lang()].mediums);

  const labelApartado = (k: string) =>
    k in APARTADOS ? APARTADOS[k as keyof typeof APARTADOS].label[lang()] : k;
  const labelMedium = (k: string) => mediumDict()[k] ?? k;
  const groupLabel = (key: string, type: "medium" | "apartado") =>
    type === "medium" ? labelMedium(key) : labelApartado(key);

  const filtered = $derived(() => {
    const q = filters.search.trim().toLowerCase();
    const list = infographics.filter((p) => {
      const matchSearch = !q || p.title[lang()].toLowerCase().includes(q);
      const matchApartado =
        !filters.apartados.length ||
        (p.apartado && filters.apartados.includes(p.apartado));
      const matchMedium =
        !filters.mediums.length ||
        (p.mediumKey && filters.mediums.includes(p.mediumKey));
      return matchSearch && matchApartado && matchMedium;
    });

    if (filters.sortBy === "apartado" || filters.sortBy === "medium")
      return list;

    const direction = getDirection(filters.sortDir);
    if (filters.sortBy === "title") {
      return [...list].sort(
        (a, b) => a.title[lang()].localeCompare(b.title[lang()]) * direction,
      );
    }
    return [...list].sort(
      (a, b) =>
        sorters[
          filters.sortBy as Exclude<SortBy, "title" | "apartado" | "medium">
        ](a, b) * direction,
    );
  });

  const grouped = $derived(() => {
    if (filters.sortBy !== "apartado" && filters.sortBy !== "medium") return [];

    const list = filtered();
    const dir = getDirection(filters.sortDir);
    const preSortedList = [...list].sort(
      (a, b) => Date.parse(b.date || "0") - Date.parse(a.date || "0"),
    );

    const map = new Map<string, Infographic[]>();
    for (const item of preSortedList) {
      const key =
        filters.sortBy === "medium"
          ? (item.mediumKey ?? "__unknown__")
          : (item.apartado ?? "__unknown__");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }

    const result = Array.from(map, ([key, items]) => ({ key, items }));

    if (filters.sortBy === "apartado") {
      return result.sort((a, b) => {
        const aOrder = APARTADOS[a.key as keyof typeof APARTADOS]?.order ?? 999;
        const bOrder = APARTADOS[b.key as keyof typeof APARTADOS]?.order ?? 999;
        return (aOrder - bOrder) * dir;
      });
    }
    return result.sort((a, b) => {
      if (a.key === "__unknown__") return 1;
      if (b.key === "__unknown__") return -1;
      return a.key.localeCompare(b.key) * dir;
    });
  });

  const sortOptions = [
    { value: "date", key: "newest" },
    { value: "title", key: "title" },
    { value: "apartado", key: "section" },
    { value: "medium", key: "medium" },
  ] as const;

  const renderNode = (node: string | { text: string }) =>
    typeof node === "string" ? node : (node?.text ?? "");

  return {
    filters,
    get filtered() {
      return filtered();
    },
    get grouped() {
      return grouped();
    },
    treemap,
    groupLabel,
    sortOptions,
    renderNode,
  };
}
