import { APARTADOS } from "$lib/config/apartados.config";
import type { Infographic } from "./infographics.metrics";
import type { Filters, Lang } from "./infographics.logic";
import { getFilteredList, getDirection } from "./infographics.logic";

export interface GroupedInfographics {
  key: string;
  items: Infographic[];
}

export function getGroupedList(
  filters: Filters,
  lang: Lang,
): GroupedInfographics[] {
  if (filters.sortBy !== "apartado" && filters.sortBy !== "medium") {
    return [];
  }

  const list = getFilteredList(filters, lang);
  const dir = getDirection(filters.sortDir);

  const preSortedList = [...list].sort((a, b) => {
    const tA = a.date ? Date.parse(a.date) : 0;
    const tB = b.date ? Date.parse(b.date) : 0;
    return tB - tA;
  });

  const map = new Map<string, Infographic[]>();

  for (const item of preSortedList) {
    const key =
      filters.sortBy === "medium"
        ? (item.mediumKey ?? "__unknown__")
        : (item.apartado ?? "__unknown__");

    let group = map.get(key);
    if (!group) {
      group = [];
      map.set(key, group);
    }
    group.push(item);
  }


  const grouped: GroupedInfographics[] = Array.from(map, ([key, items]) => ({
    key,
    items,
  }));

  if (filters.sortBy === "apartado") {
    return grouped.sort((a, b) => {
      const aOrder = APARTADOS[a.key as keyof typeof APARTADOS]?.order ?? 999;
      const bOrder = APARTADOS[b.key as keyof typeof APARTADOS]?.order ?? 999;
      return (aOrder - bOrder) * dir;
    });
  }

  return grouped.sort((a, b) => {
    if (a.key === "__unknown__") return 1;
    if (b.key === "__unknown__") return -1;

    return a.key.localeCompare(b.key) * dir;
  });
}
