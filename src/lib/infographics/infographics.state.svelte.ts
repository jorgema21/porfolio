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
  sortDir: "desc" | "asc";
};

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

const dir = (f: Filters) => (f.sortDir === "desc" ? 1 : -1);

/* =========================
   PURE FUNCTION (CLAVE FIX)
========================= */

function getFilteredList(
  filters: Filters,
  lang: "es" | "en"
): Infographic[] {
  const q = filters.search.trim().toLowerCase();

  const list = infographics.filter((p) => {
    const matchSearch =
      !q || p.title[lang].toLowerCase().includes(q);

    const matchApartado =
      !filters.apartados.length ||
      (p.apartado &&
        filters.apartados.includes(p.apartado as ApartadoKey));

    const matchMedium =
      !filters.mediums.length ||
      (p.mediumKey && filters.mediums.includes(p.mediumKey));

    return matchSearch && matchApartado && matchMedium;
  });

  if (
    filters.sortBy !== "medium" &&
    filters.sortBy !== "apartado"
  ) {
    return list.sort(
      (a, b) =>
        sorters(lang)[filters.sortBy](a, b) * dir(filters)
    );
  }

  return list;
}

/* =========================
   STATE
========================= */

export function createInfographicsState(
  lang: () => "es" | "en"
) {
  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "desc",
  });

  /* =========================
     FILTERED
  ========================= */

  const filtered = $derived.by(() =>
    getFilteredList(filters, lang())
  );

  /* =========================
     GROUPED (SIN DEPENDENCIA DIRECTA)
  ========================= */

  const grouped = $derived.by(() => {
    const sort = filters.sortBy;
    const direction = filters.sortDir === "asc" ? 1 : -1;

    if (sort !== "medium" && sort !== "apartado") {
      return [];
    }

    const list = getFilteredList(filters, lang());

    const groups = new Map<string, Infographic[]>();

    for (const item of list) {
      const key =
        sort === "medium"
          ? item.mediumKey ?? "__unknown__"
          : (item.apartado as ApartadoKey) ?? "__unknown__";

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)!.push(item);
    }

    const result = Array.from(groups.entries()).map(
      ([key, items]) => ({
        key,
        items,
      })
    );

    if (sort === "apartado") {
      return result.sort((a, b) => {
        const aOrder =
          APARTADOS[a.key as ApartadoKey]?.order ?? 999;

        const bOrder =
          APARTADOS[b.key as ApartadoKey]?.order ?? 999;

        return (aOrder - bOrder) * direction;
      });
    }

    return result.sort(
      (a, b) => a.key.localeCompare(b.key) * direction
    );
  });

  return {
    filters, // El objeto state es reactivo por sí mismo, no hay problema aquí
    get filtered() { return filtered }, // Usamos un getter para mantener la reactividad
    get grouped() { return grouped }    // Usamos un getter para mantener la reactividad
  };
}