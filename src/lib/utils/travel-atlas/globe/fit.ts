import { geoArea, geoCentroid, geoDistance } from "d3-geo";
import type { Polygon } from "geojson";

import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";
import type { AtlasAreaFeature } from "#lib/utils/travel-atlas/globe/topology.js";
import type { CameraPosition } from "#lib/utils/travel-atlas/globe/camera-controller.svelte.js";
import { ATLAS_CENTER, ATLAS_GLOBE_RADIUS } from "./geometry.js";

import { clampLatitude } from "#lib/utils/travel-atlas/globe/camera.js";

export function fitAtlasBoundary(
  boundary: AtlasAreaFeature,
  place: AtlasPlace,
  minZoom: number,
  maxZoom: number,
): CameraPosition | null {
  let geometry = boundary.geometry;

  if (place.type === "country" && geometry.type === "MultiPolygon") {
    let largest: Polygon | null = null;
    let largestArea = 0;

    for (const coordinates of geometry.coordinates) {
      const polygon: Polygon = {
        type: "Polygon",
        coordinates,
      };

      const area = geoArea(polygon);

      if (area > largestArea) {
        largestArea = area;
        largest = polygon;
      }
    }

    if (largest) {
      geometry = largest;
    }
  }

  const centroid = geoCentroid(geometry);

  if (!centroid.every(Number.isFinite)) {
    return null;
  }

  const center: [number, number] = [centroid[0], clampLatitude(centroid[1])];

  const polygons =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

  let radius = 0;

  for (const polygon of polygons) {
    const exterior = polygon[0];

    if (!exterior) continue;

    for (const position of exterior) {
      radius = Math.max(
        radius,
        geoDistance(center, [position[0], position[1]]),
      );
    }
  }

  if (!Number.isFinite(radius) || radius <= 0) {
    return null;
  }

  const zoom =
    radius >= Math.PI / 2
      ? minZoom
      : (ATLAS_CENTER * 0.84) / (ATLAS_GLOBE_RADIUS * Math.sin(radius));

  return {
    longitude: center[0],
    latitude: center[1],
    zoom: Math.max(minZoom, Math.min(maxZoom, zoom)),
  };
}
