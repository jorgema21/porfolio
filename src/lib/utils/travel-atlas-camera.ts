import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

export interface AtlasDragRotation {
  longitudeChange: number;
  latitudeChange: number;
}

export function clampLatitude(latitude: number): number {
  return Math.max(-85, Math.min(85, latitude));
}

export const ATLAS_PROVINCE_ZOOM = 46;

export function initialZoomFor(
  place: AtlasPlace | null,
  minZoom: number,
  maxZoom: number,
): number {
  if (!place) return minZoom;

  const zoomByType: Record<AtlasPlace["type"], number> = {
    country: 8.5,
    region: 20,
    province: ATLAS_PROVINCE_ZOOM,
    municipality: 60,
  };

  return Math.max(minZoom, Math.min(maxZoom, zoomByType[place.type]));
}

export function dragRotation(
  deltaX: number,
  deltaY: number,
  width: number,
  height: number,
): AtlasDragRotation {
  return {
    longitudeChange: -(deltaX / width) * 180,
    latitudeChange: (deltaY / height) * 180,
  };
}

export function wheelZoomFactor(deltaY: number, deltaMode: number): number {
  const delta =
    deltaMode === 1 ? deltaY * 16 : deltaMode === 2 ? deltaY * 320 : deltaY;

  return Math.max(0.8, Math.min(1.25, Math.exp(-delta * 0.002)));
}
