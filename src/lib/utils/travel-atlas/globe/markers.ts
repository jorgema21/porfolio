import { geoDistance } from "d3-geo";
import type { GeoProjection } from "d3-geo";

import { ATLAS_VIEWBOX_SIZE } from "./geometry.js";

import { ATLAS_PROVINCE_ZOOM } from "#lib/utils/travel-atlas/globe/camera.js";

import type {
  AtlasPlace,
  AtlasRelevance,
} from "#lib/types/travel-atlas.types.js";

export interface AtlasMarkerPoint {
  id: string;
  x: number;
  y: number;
  active: boolean;
  relevance: AtlasRelevance | undefined;
  articleCount: number;
}

export interface GlobeMarker {
  id: string;
  placeId: string | null;
  x: number;
  y: number;
  count: number;
  activeCount: number;
  relevance: AtlasRelevance | null;
  articleCount: number;
}

export function getAtlasMarkerSize(articleCount: number): number {
  const count = Math.max(1, articleCount);

  return Math.min(5.5, 2.8 + (Math.sqrt(count) - 1) * 1.6);
}

export function getAtlasMarkerPoints(
  markers: readonly AtlasPlace[],
  activeMarkerIds: ReadonlySet<string>,
  relevanceByPlace: ReadonlyMap<string, AtlasRelevance>,
  articleCountByPlace: ReadonlyMap<string, number>,
  projection: GeoProjection,
  center: readonly [number, number],
): AtlasMarkerPoint[] {
  const cameraCenter: [number, number] = [center[0], center[1]];

  return markers.flatMap((place): AtlasMarkerPoint[] => {
    const coordinates: [number, number] = [
      place.coordinates[0],
      place.coordinates[1],
    ];

    if (geoDistance(cameraCenter, coordinates) >= Math.PI / 2) {
      return [];
    }

    const point = projection(coordinates);

    if (!point) return [];

    return [
      {
        id: place.id,
        x: point[0],
        y: point[1],
        active: activeMarkerIds.has(place.id),
        relevance: relevanceByPlace.get(place.id),
        articleCount: articleCountByPlace.get(place.id) ?? 0,
      },
    ];
  });
}

export function getAtlasMarkerClusters(
  markerPoints: readonly AtlasMarkerPoint[],
  zoom: number,
  maxZoom: number,
  individualZoom = ATLAS_PROVINCE_ZOOM,
): GlobeMarker[] {
  const points = [...markerPoints].sort((a, b) => a.id.localeCompare(b.id));

  if (zoom >= Math.min(maxZoom, individualZoom) - 0.01) {
    return points.map(
      (point): GlobeMarker => ({
        id: point.id,
        placeId: point.id,
        relevance: point.relevance ?? null,
        articleCount: point.articleCount,
        x: point.x,
        y: point.y,
        count: 1,
        activeCount: point.active ? 1 : 0,
      }),
    );
  }

  const visited = new Set<number>();
  const clusters: GlobeMarker[] = [];
  const threshold = zoom <= 3.5 ? 14 : 10;

  for (let i = 0; i < points.length; i++) {
    if (visited.has(i)) continue;

    const members = [i];
    visited.add(i);

    for (let current = 0; current < members.length; current++) {
      const point = points[members[current]];

      for (let j = 0; j < points.length; j++) {
        if (visited.has(j)) continue;

        const candidate = points[j];

        if (
          Math.hypot(point.x - candidate.x, point.y - candidate.y) <= threshold
        ) {
          members.push(j);
          visited.add(j);
        }
      }
    }

    const group = members.map((index) => points[index]);

    const x = group.reduce((sum, point) => sum + point.x, 0) / group.length;

    const y = group.reduce((sum, point) => sum + point.y, 0) / group.length;

    clusters.push({
      id: group
        .map((point) => point.id)
        .sort()
        .join("|"),
      placeId: group.length === 1 ? group[0].id : null,
      relevance: group.length === 1 ? (group[0].relevance ?? null) : null,
      articleCount: group.length === 1 ? group[0].articleCount : 0,
      x,
      y,
      count: group.length,
      activeCount: group.filter((point) => point.active).length,
    });
  }

  return clusters;
}

export function getAtlasMarkerAtPointer(
  event: PointerEvent,
  element: HTMLElement,
  markers: readonly GlobeMarker[],
): GlobeMarker | null {
  const rect = element.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height);

  if (size <= 0) return null;

  const offsetX = (rect.width - size) / 2;
  const offsetY = (rect.height - size) / 2;

  const x = ((event.clientX - rect.left - offsetX) / size) * ATLAS_VIEWBOX_SIZE;

  const y = ((event.clientY - rect.top - offsetY) / size) * ATLAS_VIEWBOX_SIZE;

  return (
    [...markers]
      .filter((item) => {
        const distance = Math.hypot(item.x - x, item.y - y);

        if (item.count > 1) {
          return distance <= 14;
        }

        const markerSize = getAtlasMarkerSize(item.articleCount);

        const hitRadius =
          item.relevance === "mention"
            ? Math.max(7, markerSize * 1.3)
            : item.relevance === "detailed"
              ? Math.max(7, markerSize * Math.SQRT2)
              : Math.max(7, markerSize);

        return distance <= hitRadius;
      })
      .sort(
        (a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y),
      )[0] ?? null
  );
}
