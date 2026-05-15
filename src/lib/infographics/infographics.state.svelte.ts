import type { Lang } from "./infographics.logic";
import type { Filters } from "./infographics.logic";

import { getFilteredList } from "./infographics.logic";
import { getGroupedList } from "./infographics.selectors";

export function createInfographicsState(lang: () => Lang) {
  const filters = $state<Filters>({
    search: "",
    apartados: [],
    mediums: [],
    sortBy: "date",
    sortDir: "asc",
  });

  const filtered = $derived(getFilteredList(filters, lang()));

  const grouped = $derived(getGroupedList(filters, lang()));

  return {
    filters,
    get filtered() {
      return filtered;
    },
    get grouped() {
      return grouped;
    },
  };
}
