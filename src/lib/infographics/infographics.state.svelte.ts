import { infographics } from "$lib/data/infographics.data";
import type { Infographic } from "./infographics.metrics";
import { APARTADOS } from "$lib/config/apartados.config";

export type MediumKey = string;
export type ApartadoKey = keyof typeof APARTADOS;

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

  /* =========================
     FILTERED (SOLO LISTA BASE)
  ========================= */

  const filtered = $derived(() => {
    const l = lang();
    const q = filters.search.trim().toLowerCase();

    let result = infographics.filter((p) => {
      const matchSearch =
        !q || p.title[l].toLowerCase().includes(q);

      const matchApartado =
        !filters.apartados.length ||
        (p.apartado &&
          filters.apartados.includes(p.apartado as ApartadoKey));

      const matchMedium =
        !filters.mediums.length ||
        (p.mediumKey && filters.mediums.includes(p.mediumKey));

      return matchSearch && matchApartado && matchMedium;
    });

    // 👇 SOLO se ordena cuando NO hay agrupación
    if (filters.sortBy !== "medium" && filters.sortBy !== "apartado") {
      return result.sort(
        (a, b) =>
          sorters(l)[filters.sortBy](a, b) * dir(filters)
      );
    }

    return result;
  });

  /* =========================
     GROUPED (ORDEN SOLO DE GRUPOS)
  ========================= */

  const grouped = $derived(() => {
    const sort = filters.sortBy;
    const direction = filters.sortDir === "asc" ? 1 : -1;

    if (sort !== "medium" && sort !== "apartado") {
      return null;
    }

    const groups = new Map<string, Infographic[]>();

    for (const item of filtered()) {
      const key =
        sort === "medium"
          ? item.mediumKey ?? "__unknown__"
          : item.apartado && item.apartado in APARTADOS
            ? item.apartado
            : "__unknown__";

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)!.push(item);
    }

    const result = Array.from(groups.entries()).map(
      ([key, items]) => ({
        key,
        items, // 👈 SIN ordenar dentro del grupo
      })
    );

    /* =========================
       ORDEN SOLO DE GRUPOS
    ========================= */

    if (sort === "apartado") {
      return result.sort((a, b) => {
        const aOrder =
          APARTADOS[a.key as keyof typeof APARTADOS]?.order ?? 999;

        const bOrder =
          APARTADOS[b.key as keyof typeof APARTADOS]?.order ?? 999;

        return (aOrder - bOrder) * direction;
      });
    }

    // medium
    return result.sort(
      (a, b) => a.key.localeCompare(b.key) * direction
    );
  });

  return {
    filters,
    filtered,
    grouped,
  };
};