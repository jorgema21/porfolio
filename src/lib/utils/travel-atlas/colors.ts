import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";
import { getAtlasPath, type AtlasIndex } from "./index.js";

const countryColors: Readonly<Record<string, string>> = {
  ESP: "#C62828",
  FRA: "#1756B8",
  ITA: "#13824B",
  DEU: "#D69A00",
  CHE: "#8C244C",
  CZE: "#7541A6",
  POL: "#C23879",
  EST: "#147A78",
  FIN: "#087F99",
};

const spanishMunicipalityColors = [
  "#8B2024",
  "#E57377",
  "#AE3035",
  "#F3A2A5",
  "#C84A4F",
  "#9B282D",
  "#DC6267",
  "#BA3C41",
] as const;

const palette = [
  "#D69A00",
  "#E46A20",
  "#7541A6",
  "#087F99",
  "#8C244C",
  "#147A78",
  "#9A5016",
  "#C23879",
  "#536FBC",
  "#68851D",
  "#693D9B",
  "#344C73",
] as const;

function hashId(id: string): number {
  let hash = 2166136261;

  for (const character of id) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getCountryColor(id: string): string {
  return countryColors[id] ?? palette[hashId(id) % palette.length];
}

export function getAtlasPlaceColor(
  index: AtlasIndex,
  place: AtlasPlace,
): string {
  const country = getAtlasPath(index, place.id)[0];

  if (!country) {
    return "var(--color-travel)";
  }

  const baseColor = getCountryColor(country.boundaryId ?? country.id);

  if (place.type === "country") {
    return baseColor;
  }
  if (country.boundaryId === "ESP" && place.type === "municipality") {
    const siblings = [...(index.children.get(place.parentId) ?? [])]
      .filter((sibling) => sibling.type === "municipality")
      .sort((a, b) => a.id.localeCompare(b.id));

    const position = siblings.findIndex((sibling) => sibling.id === place.id);

    if (position !== -1) {
      return spanishMunicipalityColors[
        position % spanishMunicipalityColors.length
      ];
    }
  }

  const variation = hashId(place.id) % 3;

  const strength =
    {
      region: 88,
      province: 76,
      municipality: 64,
    }[place.type] -
    variation * 5;

  return `color-mix(in oklch, ${baseColor} ${strength}%, white)`;
}
