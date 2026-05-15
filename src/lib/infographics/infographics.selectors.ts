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
  const map = new Map<string, Infographic[]>();

  for (const item of list) {
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

  const grouped: GroupedInfographics[] = Array.from(map, ([key, items]) => {
    // Ordenar alfabéticamente los proyectos dentro de su propio grupo
    const sortedItems = [...items].sort(
      (a, b) => a.title[lang].localeCompare(b.title[lang]) * dir,
    );
    return { key, items: sortedItems };
  });

  // Ordenar los contenedores (Grupos globales)
  if (filters.sortBy === "apartado") {
    return grouped.sort((a, b) => {
      const aOrder = APARTADOS[a.key as keyof typeof APARTADOS]?.order ?? 999;
      const bOrder = APARTADOS[b.key as keyof typeof APARTADOS]?.order ?? 999;
      return (aOrder - bOrder) * dir;
    });
  }

  return grouped.sort((a, b) => a.key.localeCompare(b.key) * dir);
}
