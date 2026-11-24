import { asset } from "$app/paths";
import { geoArea } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  MultiLineString,
  MultiPolygon,
  Polygon,
  Position,
} from "geojson";
import type {
  GeometryCollection,
  Objects,
  Topology,
} from "topojson-specification";
import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

type Area = Polygon | MultiPolygon;
type Properties = Record<string, unknown>;
type AtlasTopology = Topology<Objects<Properties>>;
type AtlasLayer = GeometryCollection<Properties>;
export type AtlasAreaFeature = Feature<Area, Properties>;
export type AtlasAreaCollection = FeatureCollection<Area, Properties>;

export interface AtlasCountryTopology {
  regions: AtlasAreaCollection;
  units: AtlasAreaCollection;
  regionBorders: MultiLineString;
  unitBorders: ReadonlyMap<string, MultiLineString>;
}

const requests = new Map<string, Promise<unknown>>();
type AtlasWorldDetail = "overview" | "full";
const worldRequests = new Map<AtlasWorldDetail, Promise<AtlasAreaCollection>>();
const countryRequests = new Map<string, Promise<AtlasCountryTopology | null>>();

function isRecord(value: unknown): value is Properties {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getJson(filename: string): Promise<unknown> {
  const cached = requests.get(filename);
  if (cached) return cached;

  const path = `atlas/natural-earth/topology/${filename}`;
  const request = fetch(asset(path as Parameters<typeof asset>[0]))
    .then(async (response): Promise<unknown> => {
      if (!response.ok)
        throw new Error(`Error al cargar ${filename}: ${response.status}`);
      return response.json();
    })
    .catch((error: unknown) => {
      requests.delete(filename);
      throw error;
    });

  requests.set(filename, request);
  return request;
}

function readTopology(value: unknown): AtlasTopology {
  if (
    !isRecord(value) ||
    value.type !== "Topology" ||
    !isRecord(value.objects) ||
    !Array.isArray(value.arcs) ||
    !isRecord(value.transform)
  ) {
    throw new Error("Topología cartográfica no válida.");
  }
  return value as unknown as AtlasTopology;
}

function getLayer(topology: AtlasTopology, name: string): AtlasLayer {
  const layer = topology.objects[name];
  if (!layer || layer.type !== "GeometryCollection") {
    throw new Error(`Falta la capa ${name}.`);
  }
  return layer;
}
function orientPolygon(rings: Position[][]): Position[][] {
  return geoArea({ type: "Polygon", coordinates: rings }) > 2 * Math.PI
    ? rings.map((ring) => [...ring].reverse())
    : rings;
}

function isArea(geometry: Geometry | null): geometry is Area {
  return geometry?.type === "Polygon" || geometry?.type === "MultiPolygon";
}

function decodeAreas(
  topology: AtlasTopology,
  layer: AtlasLayer,
): AtlasAreaCollection {
  const collection = feature(topology, layer);
  const features: AtlasAreaFeature[] = [];

  for (const item of collection.features) {
    const geometry = item.geometry;
    if (!isArea(geometry)) continue;
    const normalized: Area =
      geometry.type === "Polygon"
        ? { type: "Polygon", coordinates: orientPolygon(geometry.coordinates) }
        : {
            type: "MultiPolygon",
            coordinates: geometry.coordinates.map(orientPolygon),
          };
    features.push({
      ...item,
      properties: isRecord(item.properties) ? item.properties : {},
      geometry: normalized,
    });
  }

  return { type: "FeatureCollection", features };
}

export function getAtlasWorldTopology(
  detail: AtlasWorldDetail = "full",
): Promise<AtlasAreaCollection> {
  const cached = worldRequests.get(detail);
  if (cached) return cached;

  const filename =
    detail === "overview"
      ? "countries-overview.topojson"
      : "countries.topojson";
  const request = getJson(filename)
    .then((value) => {
      const topology = readTopology(value);
      return decodeAreas(topology, getLayer(topology, "countries"));
    })
    .catch((error: unknown) => {
      worldRequests.delete(detail);
      requests.delete(filename);
      throw error;
    });

  worldRequests.set(detail, request);
  return request;
}

export function getAtlasCountryTopology(
  code: string,
): Promise<AtlasCountryTopology | null> {
  const country = code.toUpperCase();
  const cached = countryRequests.get(country);
  if (cached) return cached;

  const request = (async () => {
    const manifest = await getJson("manifest.json");
    if (!isRecord(manifest) || !Array.isArray(manifest.countries)) {
      throw new Error("Manifiesto cartográfico no válido.");
    }
    if (!manifest.countries.includes(country)) return null;

    const topology = readTopology(await getJson(`${country}.topojson`));
    const regions = getLayer(topology, "regions");
    const units = getLayer(topology, "units");
    const groups = new Map<string, AtlasLayer["geometries"]>();

    for (const unit of units.geometries) {
      const properties = unit.properties;
      if (!isRecord(properties) || typeof properties.regionCode !== "string")
        continue;
      const key = properties.regionCode;
      const group = groups.get(key) ?? [];
      group.push(unit);
      groups.set(key, group);
    }

    const unitBorders = new Map<string, MultiLineString>();
    for (const [key, geometries] of groups) {
      if (geometries.length < 2) continue;
      unitBorders.set(
        key,
        mesh(
          topology,
          { type: "GeometryCollection", geometries },
          (a, b) => a !== b,
        ),
      );
    }

    return {
      regions: decodeAreas(topology, regions),
      units: decodeAreas(topology, units),
      regionBorders: mesh(topology, regions, (a, b) => a !== b),
      unitBorders,
    };
  })().catch((error: unknown) => {
    countryRequests.delete(country);
    requests.delete(`${country}.topojson`);
    throw error;
  });

  countryRequests.set(country, request);
  return request;
}

function normalizeName(value: unknown): string {
  return typeof value === "string"
    ? value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
        .trim()
    : "";
}

export function findAtlasBoundary(
  collection: AtlasAreaCollection | null,
  place: AtlasPlace | null,
  codeKeys: readonly string[],
  nameKeys: readonly string[],
): AtlasAreaFeature | null {
  if (!collection || !place) return null;
  if (place.boundaryId) {
    const match = collection.features.find((item) =>
      codeKeys.some((key) => item.properties[key] === place.boundaryId),
    );
    if (match) return match;
  }
  const names = new Set(
    [normalizeName(place.name.es), normalizeName(place.name.en)].filter(
      Boolean,
    ),
  );
  return (
    collection.features.find((item) =>
      nameKeys.some((key) => names.has(normalizeName(item.properties[key]))),
    ) ?? null
  );
}
