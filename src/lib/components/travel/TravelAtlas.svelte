<script lang="ts">
  import { langSignal, t } from "#lib/i18n/index.svelte.js";

  import { travelProjects } from "#lib/data/projects/travel.js";
  import { travelAtlasDataset } from "#lib/data/travel-atlas.js";

  import {
    createAtlasIndex,
    getAtlasCoverage,
    getAtlasPath,
    type AtlasFilter,
  } from "#lib/utils/travel-atlas/index.js";

  import { getAtlasMarkerEditorial } from "#lib/utils/travel-atlas/editorial.js";
  import { getAtlasNavigation } from "#lib/utils/travel-atlas/navigation.js";
  import { getAtlasPlaceColor } from "#lib/utils/travel-atlas/colors.js";

  import type {
    AtlasDonutSegment,
    AtlasPlace,
  } from "#lib/types/travel-atlas.types.js";

  import AtlasToolbar from "./AtlasToolbar.svelte";
  import AtlasBoardingPass from "./AtlasBoardingPass.svelte";
  import AtlasDonut from "./AtlasDonut.svelte";
  import AtlasGlobe from "./globe/AtlasGlobe.svelte";
  import AtlasMarkerLegend from "./AtlasMarkerLegend.svelte";
  import AtlasStats from "./AtlasStats.svelte";
  import AtlasNonGeographic from "./AtlasNonGeographic.svelte";

  let globe: ReturnType<typeof AtlasGlobe> | undefined = $state();

  let canStopRotation = $derived(globe?.canStopRotation() ?? false);

  let mapLoadFailed = $derived(globe?.hasMapLoadError() ?? false);

  const index = createAtlasIndex(travelAtlasDataset, travelProjects);

  const nonGeographicArticles = travelProjects
    .filter((article) =>
      travelAtlasDataset.nonGeographicArticleIds.includes(article.id),
    )
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  let selectedId = $state<string | null>(null);
  let filter = $state<AtlasFilter>("all");

  let lang = $derived(langSignal.current);

  let markerEditorial = $derived(
    getAtlasMarkerEditorial(travelAtlasDataset, filter),
  );

  let markerPlaces = $derived(markerEditorial.markerPlaces);

  let markerRelevance = $derived(markerEditorial.markerRelevance);

  let articleCountByPlace = $derived(markerEditorial.articleCountByPlace);

  let activeMarkerIds = $derived(markerEditorial.activeMarkerIds);

  let selectedPlace = $derived(
    selectedId === null ? null : (index.places.get(selectedId) ?? null),
  );

  let path = $derived(
    selectedId === null ? [] : getAtlasPath(index, selectedId),
  );

  let atlasCountryCode = $derived(path[0]?.boundaryId ?? null);

  let ticketAccent = $derived(
    path[0] ? getAtlasPlaceColor(index, path[0]) : "var(--color-travel)",
  );

  let globalCoverage = $derived(getAtlasCoverage(index, filter));

  let coverage = $derived(getAtlasCoverage(index, filter, selectedId));

  let navigation = $derived(
    getAtlasNavigation(index, selectedId, filter, lang),
  );

  let donutSegments: AtlasDonutSegment[] = $derived(
    navigation.destinations.map(({ place, coverage }) => ({
      id: place.id,
      label: place.name[lang],
      value: coverage.placeCount,
      color: getAtlasPlaceColor(index, place),
    })),
  );

  let donutCenterLabel = $derived(
    navigation.parent ? navigation.parent.name[lang] : t.travelAtlas.world,
  );

  function selectPlace(placeId: string | null): void {
    const place = placeId === null ? null : (index.places.get(placeId) ?? null);

    const country = place ? getAtlasPath(index, place.id)[0] : null;

    selectedId = placeId;

    globe?.resetView(place, country?.boundaryId ?? null);
  }

  function selectMapPlace(placeId: string): void {
    if (!activeMarkerIds.has(placeId)) {
      filter = "all";
    }

    selectPlace(placeId);
  }

  function selectToolbarPlace(place: AtlasPlace): void {
    if (place.type === "municipality") {
      selectMapPlace(place.id);
    } else {
      selectPlace(place.id);
    }
  }

  function goBack(): void {
    selectPlace(selectedPlace?.parentId ?? null);
  }
</script>

<section class="travel-atlas" aria-label={t.travelAtlas.aria.atlas}>
  <header class="atlas-header">
    <h2>{t.travelAtlas.title}</h2>
  </header>

  <AtlasToolbar
    {index}
    {lang}
    {selectedId}
    bind:filter
    onselect={selectToolbarPlace}
  />

  <AtlasBoardingPass
    {selectedPlace}
    {path}
    {coverage}
    {lang}
    accentColor={ticketAccent}
    onselect={selectPlace}
  />

  <section
    class="navigation-panel"
    aria-label={t.travelAtlas.aria.exploreDestinations}
  >
    <div class="globe-controls">
      <button type="button" disabled={!selectedPlace} onclick={goBack}>
        ← {t.travelAtlas.back}
      </button>

      <button type="button" onclick={() => globe?.resetView()}>
        {t.travelAtlas.recenter}
      </button>

      <button
        type="button"
        aria-disabled={!canStopRotation}
        onclick={() => {
          if (canStopRotation) {
            globe?.stopRotation();
          }
        }}
      >
        {t.travelAtlas.stopRotation}
      </button>

      {#if mapLoadFailed}
        <button type="button" onclick={() => globe?.retryMap()}>
          {t.travelAtlas.retry}
        </button>
      {/if}
    </div>

    <div class="map-load-status" role="status">
      {#if mapLoadFailed}
        <p>{t.travelAtlas.mapLoadError}</p>
      {/if}
    </div>

    <div class="atlas-map">
      <AtlasDonut
        segments={donutSegments}
        {selectedId}
        centerLabel={donutCenterLabel}
        label={t.travelAtlas.aria.distribution}
        onselect={selectPlace}
      >
        <AtlasGlobe
          bind:this={globe}
          focus={selectedPlace}
          markers={markerPlaces}
          {activeMarkerIds}
          onselect={selectMapPlace}
          relevanceByPlace={markerRelevance}
          {articleCountByPlace}
          countryCode={atlasCountryCode}
          region={path.find((place) => place.type === "region") ?? null}
          province={path.find((place) => place.type === "province") ?? null}
        />
      </AtlasDonut>
    </div>

    <AtlasMarkerLegend />

    <p class="map-credit">
      {t.travelAtlas.mapData}

      <a
        href="https://www.naturalearthdata.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Natural Earth ↗
      </a>
    </p>
  </section>

  <AtlasStats coverage={globalCoverage} />

  <AtlasNonGeographic articles={nonGeographicArticles} {lang} />
</section>

<style>
  .travel-atlas {
    --atlas-accent: var(--color-travel);

    align-self: center;
    width: min(var(--atlas-max-width), calc(100vw - 2 * var(--space-6)));

    min-width: 0;
    margin-top: var(--space-8);
    padding-top: var(--space-8);
    border-top: var(--border-1);
  }

  .atlas-header {
    margin-bottom: var(--space-4);
  }

  h2 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    line-height: var(--lh-titles);
  }

  .navigation-panel {
    min-width: 0;
    margin-top: var(--space-3);
  }

  .atlas-map {
    width: 100%;
  }

  .globe-controls {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .globe-controls button {
    min-width: var(--atlas-control-min-size);
    min-height: var(--atlas-control-min-size);
    padding: var(--space-2) var(--space-3);

    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);

    cursor: pointer;
  }

  .globe-controls button:hover:not(:disabled):not([aria-disabled="true"]) {
    background: var(--bg-soft);
  }

  .globe-controls button:disabled,
  .globe-controls button[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .map-load-status p {
    margin: var(--space-2) 0;
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--atlas-accent);
    outline-offset: 3px;
  }

  .map-credit {
    margin-top: var(--space-3) !important;
    color: var(--color-muted);
    font-size: var(--text-xs);
    text-align: center;
  }

  .map-credit a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  @media (max-width: 640px) {
    .travel-atlas {
      width: min(var(--atlas-max-width), calc(100vw - 2 * var(--space-3)));
    }
  }
</style>
