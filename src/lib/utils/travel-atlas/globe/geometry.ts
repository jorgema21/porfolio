import { geoOrthographic, type GeoProjection } from "d3-geo";

import type { CameraPosition } from "./camera-controller.svelte.js";

export const ATLAS_VIEWBOX_SIZE = 320;
export const ATLAS_CENTER = ATLAS_VIEWBOX_SIZE / 2;
export const ATLAS_GLOBE_RADIUS = 158;

export const ATLAS_MIN_ZOOM = 1;
export const ATLAS_MAX_ZOOM = 64;
export const ATLAS_DETAIL_ZOOM = 2.5;

export function createAtlasProjection(position: CameraPosition): GeoProjection {
  return geoOrthographic()
    .translate([ATLAS_CENTER, ATLAS_CENTER])
    .scale(ATLAS_GLOBE_RADIUS * position.zoom)
    .rotate([-position.longitude, -position.latitude, 0])
    .clipAngle(90)
    .clipExtent([
      [0, 0],
      [ATLAS_VIEWBOX_SIZE, ATLAS_VIEWBOX_SIZE],
    ])
    .precision(2);
}
