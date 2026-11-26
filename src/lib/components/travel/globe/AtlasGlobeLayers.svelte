<script lang="ts">
  import { geoPath, type GeoProjection } from "d3-geo";

  import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

  import {
    findAtlasBoundary,
    type AtlasAreaCollection,
    type AtlasCountryTopology,
  } from "#lib/utils/travel-atlas/globe/topology.js";

  import {
    ATLAS_CENTER,
    ATLAS_DETAIL_ZOOM,
  } from "#lib/utils/travel-atlas/globe/geometry.js";

  import { getVisibleAtlasFeatures } from "#lib/utils/travel-atlas/globe/viewport.js";

  interface Props {
    projection: GeoProjection;
    zoom: number;
    focus: AtlasPlace | null;
    countryCode: string | null;
    region: AtlasPlace | null;
    province: AtlasPlace | null;
    worldCountries: AtlasAreaCollection | null;
    overviewCountries: AtlasAreaCollection | null;
    countryData: {
      code: string;
      data: AtlasCountryTopology;
    } | null;
  }

  let {
    projection,
    zoom,
    focus,
    countryCode,
    region,
    province,
    worldCountries,
    overviewCountries,
    countryData,
  }: Props = $props();

  const sphereGradientId = $props.id();

  let pathGenerator = $derived(geoPath(projection));

  let visibleWorld = $derived(
    zoom < ATLAS_DETAIL_ZOOM
      ? (overviewCountries ?? worldCountries)
      : (worldCountries ?? overviewCountries),
  );

  let detailedWorldVisible = $derived(
    worldCountries !== null && visibleWorld === worldCountries,
  );

  let worldPath = $derived(
    visibleWorld
      ? pathGenerator(getVisibleAtlasFeatures(visibleWorld, projection))
      : null,
  );

  let activeCountry = $derived(
    detailedWorldVisible && countryData?.code === countryCode
      ? (countryData?.data ?? null)
      : null,
  );

  let selectedCountry = $derived(
    focus?.type === "country" || (!detailedWorldVisible && countryCode !== null)
      ? (visibleWorld?.features.find(
          (item) => item.properties.country === countryCode,
        ) ?? null)
      : null,
  );

  let selectedRegion = $derived(
    findAtlasBoundary(
      activeCountry?.regions ?? null,
      region,
      ["regionCode"],
      ["regionName"],
    ),
  );

  let selectedProvince = $derived.by(() => {
    if (!activeCountry || !province) return null;

    if (region && !selectedRegion) return null;

    const units = selectedRegion
      ? {
          ...activeCountry.units,
          features: activeCountry.units.features.filter(
            (item) =>
              item.properties.regionCode ===
              selectedRegion.properties.regionCode,
          ),
        }
      : activeCountry.units;

    return findAtlasBoundary(
      units,
      province,
      ["code", "unitId"],
      ["name", "nameEs", "nameEn", "name_es", "name_en"],
    );
  });

  let highlightedCountryPath = $derived(
    selectedCountry ? pathGenerator(selectedCountry) : null,
  );

  let regionHighlightPath = $derived(
    selectedRegion ? pathGenerator(selectedRegion) : null,
  );

  let provinceHighlightPath = $derived(
    selectedProvince ? pathGenerator(selectedProvince) : null,
  );

  let regionBordersPath = $derived(
    activeCountry ? pathGenerator(activeCountry.regionBorders) : null,
  );

  let unitBordersPath = $derived.by(() => {
    const code =
      selectedRegion?.properties.regionCode ??
      selectedProvince?.properties.regionCode;

    if (!activeCountry || typeof code !== "string") {
      return null;
    }

    const borders = activeCountry.unitBorders.get(code);

    return borders ? pathGenerator(borders) : null;
  });

  let sphereOpacity = $derived(
    Math.max(0, Math.min(1, 1 - Math.log(zoom) / Math.log(16))),
  );
</script>

<g class="globe-layers" aria-hidden="true">
  <defs>
    <radialGradient id={sphereGradientId} cx="32%" cy="26%" r="82%">
      <stop offset="0%" stop-color="var(--color-white)" stop-opacity="0.26" />

      <stop offset="45%" stop-color="var(--color-white)" stop-opacity="0" />

      <stop
        offset="70%"
        stop-color="var(--atlas-color-sphere-shadow)"
        stop-opacity="0.05"
      />

      <stop
        offset="100%"
        stop-color="var(--atlas-color-sphere-shadow)"
        stop-opacity="0.38"
      />
    </radialGradient>
  </defs>

  {#if worldPath}
    <path d={worldPath} class="country" vector-effect="non-scaling-stroke" />
  {/if}

  {#if highlightedCountryPath}
    <path
      d={highlightedCountryPath}
      class="country highlighted"
      vector-effect="non-scaling-stroke"
    />
  {/if}

  {#if regionHighlightPath}
    <path
      d={regionHighlightPath}
      class="country highlighted"
      class:context={provinceHighlightPath !== null}
      vector-effect="non-scaling-stroke"
    />
  {/if}

  {#if provinceHighlightPath}
    <path
      d={provinceHighlightPath}
      class="country highlighted"
      vector-effect="non-scaling-stroke"
    />
  {/if}

  {#if unitBordersPath}
    <path
      d={unitBordersPath}
      class="unit-borders"
      vector-effect="non-scaling-stroke"
    />
  {/if}

  {#if regionBordersPath}
    <path
      d={regionBordersPath}
      class="region-borders"
      vector-effect="non-scaling-stroke"
    />
  {/if}

  <circle
    cx={ATLAS_CENTER}
    cy={ATLAS_CENTER}
    r={ATLAS_CENTER}
    fill={`url(#${sphereGradientId})`}
    opacity={sphereOpacity}
    pointer-events="none"
    aria-hidden="true"
  />
</g>

<style>
  .country {
    fill: var(--atlas-color-land);
    stroke: var(--atlas-color-boundary);
    stroke-width: 0.65;
    stroke-linejoin: round;
  }

  .country.highlighted {
    fill: var(--atlas-color-highlight);
    stroke: var(--atlas-color-highlight-border);
    stroke-width: 1;
  }

  .country.highlighted.context {
    fill-opacity: 0.18;
    stroke-opacity: 0.5;
  }

  .unit-borders,
  .region-borders {
    fill: none;
    stroke-linejoin: round;
  }

  .unit-borders {
    stroke: var(--atlas-color-subdivision);
    stroke-width: 0.45;
    stroke-opacity: 0.65;
  }

  .region-borders {
    stroke: var(--atlas-color-boundary);
    stroke-width: 0.7;
    stroke-opacity: 0.85;
  }
</style>
