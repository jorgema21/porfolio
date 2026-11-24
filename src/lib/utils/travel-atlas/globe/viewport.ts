import { geoBounds, geoDistance } from "d3-geo";

import type { GeoProjection } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";

interface GeographicExtent {
  center: [number, number];
  radius: number;
}

const radians = Math.PI / 180;

const extentCache = new WeakMap<Feature<Geometry>, GeographicExtent>();

function getExtent(feature: Feature<Geometry>): GeographicExtent {
  const cached = extentCache.get(feature);

  if (cached) return cached;

  const [[west, south], [east, north]] = geoBounds(feature);

  const longitudeSpan = east >= west ? east - west : east + 360 - west;

  const latitudeSpan = north - south;

  const extent: GeographicExtent = {
    center: [west + longitudeSpan / 2, south + latitudeSpan / 2],
    radius: Math.min(Math.PI, ((longitudeSpan + latitudeSpan) / 2) * radians),
  };

  extentCache.set(feature, extent);

  return extent;
}

export function getVisibleAtlasFeatures<G extends Geometry>(
  collection: FeatureCollection<G>,
  projection: GeoProjection,
): FeatureCollection<G> {
  const [longitude, latitude] = projection.rotate();

  const center: [number, number] = [-longitude, -latitude];

  const viewportRadius = Math.asin(
    Math.min(1, (160 * Math.SQRT2) / projection.scale()),
  );

  const features = collection.features.filter((feature) => {
    const extent = getExtent(feature);

    if (!Number.isFinite(extent.radius)) return true;

    return (
      geoDistance(center, extent.center) <=
      viewportRadius + extent.radius + 0.02
    );
  });

  return {
    type: "FeatureCollection",
    features,
  };
}
