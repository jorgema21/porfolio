import type {
  AtlasDataset,
  AtlasPlace,
  AtlasRelevance,
} from "#lib/types/travel-atlas.types.js";

import type { AtlasFilter } from "./index.js";

interface AtlasMarkerEditorial {
  markerPlaces: readonly AtlasPlace[];
  markerRelevance: ReadonlyMap<string, AtlasRelevance>;
  articleCountByPlace: ReadonlyMap<string, number>;
  activeMarkerIds: ReadonlySet<string>;
}

const relevancePriority: Record<AtlasRelevance, number> = {
  protagonist: 3,
  detailed: 2,
  mention: 1,
};

export function getAtlasMarkerEditorial(
  dataset: AtlasDataset,
  filter: AtlasFilter = "all",
): AtlasMarkerEditorial {
  const markerRelevance = new Map<string, AtlasRelevance>();
  const articleIdsByPlace = new Map<string, Set<string>>();
  const activeMarkerIds = new Set<string>();

  for (const relation of dataset.relations) {
    const articleIds =
      articleIdsByPlace.get(relation.placeId) ?? new Set<string>();

    articleIds.add(relation.articleId);
    articleIdsByPlace.set(relation.placeId, articleIds);

    const currentRelevance = markerRelevance.get(relation.placeId);

    if (
      !currentRelevance ||
      relevancePriority[relation.relevance] >
        relevancePriority[currentRelevance]
    ) {
      markerRelevance.set(relation.placeId, relation.relevance);
    }

    if (filter === "all" || relation.relevance !== "mention") {
      activeMarkerIds.add(relation.placeId);
    }
  }

  const markerPlaces = dataset.places.filter((place) =>
    articleIdsByPlace.has(place.id),
  );

  const articleCountByPlace = new Map<string, number>();

  for (const [placeId, articleIds] of articleIdsByPlace) {
    articleCountByPlace.set(placeId, articleIds.size);
  }

  return {
    markerPlaces,
    markerRelevance,
    articleCountByPlace,
    activeMarkerIds,
  };
}
