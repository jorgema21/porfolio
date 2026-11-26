import type { Lang } from "#lib/types/project.types.js";
import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

import { getAtlasPath, type AtlasIndex } from "./index.js";

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();
}

export function getAtlasDestinationList(
  index: AtlasIndex,
  lang: Lang,
): AtlasPlace[] {
  return [...index.places.values()].sort((a, b) =>
    a.name[lang].localeCompare(b.name[lang], lang),
  );
}

export function getAtlasSearchPath(
  index: AtlasIndex,
  placeId: string,
  lang: Lang,
): string {
  return getAtlasPath(index, placeId)
    .slice(0, -1)
    .map((place) => place.name[lang])
    .join(" · ");
}

export function searchAtlasDestinations(
  index: AtlasIndex,
  destinations: readonly AtlasPlace[],
  searchQuery: string,
  lang: Lang,
): AtlasPlace[] {
  const query = normalizeSearch(searchQuery);

  if (!query) return [];

  return destinations
    .map((place) => {
      const name = normalizeSearch(place.name[lang]);

      const geographicPath = getAtlasPath(index, place.id)
        .slice(0, -1)
        .map((ancestor) => normalizeSearch(ancestor.name[lang]))
        .join(" ");

      const priority =
        name === query
          ? 3
          : name.startsWith(query)
            ? 2
            : name.includes(query)
              ? 1
              : geographicPath.includes(query)
                ? -1
                : null;

      return priority === null ? null : { place, priority };
    })
    .filter((result) => result !== null)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 8)
    .map(({ place }) => place);
}
