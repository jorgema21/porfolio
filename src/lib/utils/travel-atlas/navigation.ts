import type { Lang } from "#lib/types/project.types.js";
import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

import {
  getAtlasCoverage,
  type AtlasCoverage,
  type AtlasFilter,
  type AtlasIndex,
} from "./index.js";

export interface AtlasDestination {
  place: AtlasPlace;
  coverage: AtlasCoverage;
}

export interface AtlasNavigation {
  parent: AtlasPlace | null;
  destinations: AtlasDestination[];
}

export function getAtlasNavigation(
  index: AtlasIndex,
  selectedId: string | null,
  filter: AtlasFilter,
  lang: Lang,
): AtlasNavigation {
  const selectedPlace =
    selectedId === null ? null : (index.places.get(selectedId) ?? null);

  const hasChildren =
    selectedPlace !== null &&
    (index.children.get(selectedPlace.id)?.length ?? 0) > 0;

  const parentId = selectedPlace
    ? hasChildren
      ? selectedPlace.id
      : selectedPlace.parentId
    : null;

  const parent =
    parentId === null ? null : (index.places.get(parentId) ?? null);

  const destinations = (index.children.get(parentId) ?? [])
    .map((place) => ({
      place,
      coverage: getAtlasCoverage(index, filter, place.id),
    }))
    .filter(({ coverage }) => coverage.placeCount > 0)
    .sort(
      (a, b) =>
        b.coverage.placeCount - a.coverage.placeCount ||
        a.place.name[lang].localeCompare(b.place.name[lang], lang),
    );

  return {
    parent,
    destinations,
  };
}
