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

  import type { AtlasDonutSegment } from "#lib/types/travel-atlas.types.js";

  import AtlasBoardingPass from "./AtlasBoardingPass.svelte";
  import AtlasDonut from "./AtlasDonut.svelte";
  import AtlasGlobe from "./globe/AtlasGlobe.svelte";

  let globe: ReturnType<typeof AtlasGlobe> | undefined = $state();

  const index = createAtlasIndex(travelAtlasDataset, travelProjects);

  const nonGeographicArticles = travelProjects
    .filter((article) =>
      travelAtlasDataset.nonGeographicArticleIds.includes(article.id),
    )
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  let selectedId = $state<string | null>(null);
  let filter = $state<AtlasFilter>("all");

  let searchQuery = $state("");
  let destinationListOpen = $state(false);

  let lang = $derived(langSignal.current);

  let destinationList = $derived(
    [...index.places.values()].sort((a, b) =>
      a.name[lang].localeCompare(b.name[lang], lang),
    ),
  );

  function normalizeSearch(value: string): string {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .trim();
  }

  function getSearchPath(placeId: string): string {
    return getAtlasPath(index, placeId)
      .slice(0, -1)
      .map((place) => place.name[lang])
      .join(" · ");
  }

  let searchResults = $derived.by(() => {
    const query = normalizeSearch(searchQuery);

    if (!query) return [];

    return destinationList
      .map((place) => {
        const name = normalizeSearch(place.name[lang]);

        const geographicPath = getAtlasPath(index, place.id)
          .slice(0, -1)
          .map((ancestor) => normalizeSearch(ancestor.name[lang]))
          .join(" ");

        const priority =
          name === query
            ? 3
            : name.startsWith(query)
              ? 2
              : name.includes(query)
                ? 1
                : geographicPath.includes(query)
                  ? -1
                  : null;

        return priority === null ? null : { place, priority };
      })
      .filter((result) => result !== null)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 8)
      .map(({ place }) => place);
  });

  let markerEditorial = $derived(
    getAtlasMarkerEditorial(travelAtlasDataset, filter),
  );

  let markerPlaces = $derived(markerEditorial.markerPlaces);

  let markerRelevance = $derived(markerEditorial.markerRelevance);

  let articleCountByPlace = $derived(markerEditorial.articleCountByPlace);

  let activeMarkerIds = $derived(
    new Set(markerPlaces.map((place) => place.id)),
  );

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

  function goBack(): void {
    selectPlace(selectedPlace?.parentId ?? null);
  }
</script>

<section class="travel-atlas" aria-label={t.travelAtlas.aria.atlas}>
  <header class="atlas-header">
    <h2>{t.travelAtlas.title}</h2>
  </header>

  <div class="atlas-toolbar">
    <div class="atlas-search">
      <label for="atlas-search-input">
        {t.travelAtlas.search.label}
      </label>

      <input
        id="atlas-search-input"
        type="search"
        autocomplete="off"
        placeholder={t.travelAtlas.search.placeholder}
        bind:value={searchQuery}
        onkeydown={(event) => {
          if (event.key === "Escape") {
            searchQuery = "";
          }
        }}
      />

      {#if searchQuery.trim()}
        <div class="atlas-search-results">
          {#if searchResults.length > 0}
            {#each searchResults as place (place.id)}
              <button
                type="button"
                onclick={() => {
                  if (place.type === "municipality") {
                    selectMapPlace(place.id);
                  } else {
                    selectPlace(place.id);
                  }

                  searchQuery = "";
                }}
              >
                <span class="atlas-search-name">
                  {place.name[lang]}
                </span>

                {#if place.parentId}
                  <span class="atlas-search-path">
                    {getSearchPath(place.id)}
                  </span>
                {/if}
              </button>
            {/each}
          {:else}
            <p>{t.travelAtlas.search.noResults}</p>
          {/if}
        </div>
      {/if}
    </div>

    <div class="atlas-list-control">
      <span class="atlas-list-label">
        {t.travelAtlas.search.listLabel}
      </span>

      <details class="atlas-destination-list" bind:open={destinationListOpen}>
        <summary>
          {destinationListOpen
            ? t.travelAtlas.search.hideList
            : t.travelAtlas.search.showList}
        </summary>

        <div class="atlas-destination-options">
          {#each destinationList as place (place.id)}
            <button
              type="button"
              aria-current={selectedId === place.id ? "location" : undefined}
              onclick={() => {
                if (place.type === "municipality") {
                  selectMapPlace(place.id);
                } else {
                  selectPlace(place.id);
                }

                destinationListOpen = false;
              }}
            >
              <span class="atlas-destination-name">
                {place.name[lang]}
              </span>

              {#if place.parentId}
                <span class="atlas-destination-path">
                  {getSearchPath(place.id)}
                </span>
              {/if}
            </button>
          {/each}
        </div>
      </details>
    </div>

    <label class="filter-control">
      <span>{t.travelAtlas.coverage}</span>

      <select bind:value={filter}>
        <option value="all">
          {t.travelAtlas.filter.all}
        </option>

        <option value="substantial">
          {t.travelAtlas.filter.substantial}
        </option>
      </select>
    </label>
  </div>

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

    <ul class="atlas-marker-legend">
      <li>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="6" />
        </svg>
        {t.travelAtlas.relevance.protagonist}
      </li>

      <li>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <rect x="4" y="4" width="12" height="12" rx="0.5" />
        </svg>
        {t.travelAtlas.relevance.detailed}
      </li>

      <li>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 3 L17 16 H3 Z" />
        </svg>
        {t.travelAtlas.relevance.mention}
      </li>

      <li>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="9" />
          <circle class="legend-ring" cx="10" cy="10" r="7" />

          <text x="10" y="10" text-anchor="middle" dominant-baseline="central"
            >4</text
          >
        </svg>
        {t.travelAtlas.groupedPlaces}
      </li>
    </ul>

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

  <dl class="atlas-stats">
    <div>
      <dt>
        {globalCoverage.articleCount === 1
          ? t.travelAtlas.articleCountLabelOne
          : t.travelAtlas.articleCountLabel}
      </dt>
      <dd>{globalCoverage.articleCount}</dd>
    </div>

    <div>
      <dt>
        {globalCoverage.placeCount === 1
          ? t.travelAtlas.places.one
          : t.travelAtlas.places.other}
      </dt>
      <dd>{globalCoverage.placeCount}</dd>
    </div>

    <div>
      <dt>
        {globalCoverage.countryCount === 1
          ? t.travelAtlas.countriesCountLabelOne
          : t.travelAtlas.countriesCountLabel}
      </dt>
      <dd>{globalCoverage.countryCount}</dd>
    </div>
  </dl>

  {#if nonGeographicArticles.length > 0}
    <section
      class="atlas-non-geographic"
      aria-labelledby="atlas-non-geographic-title"
    >
      <h3 id="atlas-non-geographic-title">
        {t.travelAtlas.nonGeographic.title}
      </h3>

      <p>{t.travelAtlas.nonGeographic.description}</p>

      <ul>
        {#each nonGeographicArticles as article (article.id)}
          <li>
            {#if article.externalUrl}
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title[lang]}
                <span aria-hidden="true">↗</span>
                <span class="sr-only">
                  {t.travelAtlas.aria.newTab}
                </span>
              </a>
            {:else}
              {article.title[lang]}
            {/if}

            {#if article.mediumStyle}
              <span class="atlas-article-medium">
                {article.mediumStyle}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</section>

<style>
  .travel-atlas {
    --atlas-accent: var(--color-travel);

    align-self: center;
    width: min(1200px, calc(100vw - 2 * var(--space-6)));
    min-width: 0;
    margin-top: var(--space-8);
    padding-top: var(--space-8);
    border-top: var(--border-1);
  }

  .atlas-header {
    margin-bottom: var(--space-4);
  }

  .atlas-toolbar {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: end;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }

  .atlas-list-control {
    display: grid;
    align-content: start;
    gap: var(--space-2);
    min-width: 0;
  }

  .atlas-list-label {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  h2,
  h3 {
    margin: 0;
  }

  h2 {
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    line-height: var(--lh-titles);
  }

  .filter-control {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
    font-size: var(--text-sm);
    font-weight: 700;
  }

  select,
  .globe-controls button {
    min-height: 44px;
    padding: var(--space-2) var(--space-3);
    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);
  }

  select {
    box-sizing: border-box;
    width: 100%;
    color: var(--color-text);
    font: inherit;
    font-weight: 400;
  }

  button,
  select {
    cursor: pointer;
  }

  button:focus-visible,
  select:focus-visible,
  a:focus-visible,
  .atlas-search input:focus-visible,
  .atlas-destination-list summary:focus-visible {
    outline: 2px solid var(--atlas-accent);
    outline-offset: 3px;
  }

  .navigation-panel {
    min-width: 0;
    margin-top: var(--space-3);
  }

  .atlas-map {
    --atlas-donut-max-width: 900px;

    width: 100%;
  }

  .atlas-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    gap: var(--space-8);
    margin: var(--space-6) 0 0;
    padding-top: var(--space-4);

    border-top: var(--border-1);
  }

  .atlas-stats > div {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
  }

  .atlas-stats dt {
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  .atlas-stats dd {
    order: -1;
    margin: 0;
    font-size: var(--text-xl);
    font-weight: 700;
  }

  .globe-controls {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .globe-controls button {
    min-width: 44px;
  }

  .globe-controls button:hover:not(:disabled),
  .atlas-search-results button:hover,
  .atlas-search-results button:focus-visible,
  .atlas-destination-options button:hover,
  .atlas-destination-options button:focus-visible,
  .atlas-destination-options button[aria-current="location"] {
    background: var(--bg-soft);
  }

  .globe-controls button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
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

  .atlas-search {
    position: relative;
    display: grid;
    gap: var(--space-2);
    min-width: 0;
  }

  .atlas-search label {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .atlas-search input {
    box-sizing: border-box;
    width: 100%;
    min-height: 44px;
    padding: var(--space-2) var(--space-3);
    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);
    color: var(--color-text);
    font: inherit;
  }

  .atlas-search-results {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 260px;
    overflow-y: auto;
    padding: var(--space-2);
    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);
    box-shadow: 0 6px 20px rgb(0 0 0 / 0.08);
  }

  .atlas-destination-list {
    position: relative;
    min-width: 0;
  }

  .atlas-destination-list summary {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2);

    min-height: 44px;
    padding: var(--space-2) var(--space-3);

    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);

    font-size: var(--text-sm);
    font-weight: 400;
    list-style: none;
    cursor: pointer;
  }

  .atlas-destination-list summary::-webkit-details-marker {
    display: none;
  }

  .atlas-destination-list summary::before {
    content: "";
    width: 7px;
    height: 7px;

    flex-shrink: 0;

    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;

    transform: rotate(-45deg);
  }

  .atlas-destination-list[open] summary::before {
    transform: rotate(45deg);
  }

  .atlas-destination-options {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 300px;
    overflow-y: auto;
    padding: var(--space-2);
    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);
    box-shadow: 0 6px 20px rgb(0 0 0 / 0.08);
  }

  .atlas-search-results button,
  .atlas-destination-options button {
    display: block;
    width: 100%;
    min-height: 44px;
    padding: var(--space-2);
    border: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .atlas-search-name,
  .atlas-destination-name {
    display: block;
    font-weight: 700;
  }

  .atlas-search-path,
  .atlas-destination-path {
    display: block;
    margin-top: 2px;
    color: var(--color-muted);
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .atlas-search-results p {
    margin: 0;
    padding: var(--space-2);
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  .atlas-non-geographic {
    margin-top: var(--space-6);
    padding-top: var(--space-5);
    border-top: var(--border-1);
  }

  .atlas-non-geographic h3 {
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    line-height: var(--lh-titles);
  }

  .atlas-non-geographic p {
    margin-block: var(--space-2) var(--space-4);
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  .atlas-non-geographic ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .atlas-non-geographic li {
    display: grid;
    gap: var(--space-1);
  }

  .atlas-non-geographic a {
    color: var(--color-text);
    font-weight: 700;
    text-underline-offset: 0.2em;
  }

  .atlas-article-medium {
    color: var(--color-muted);
    font-size: var(--text-xs);
  }

  .atlas-marker-legend {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    gap: var(--space-2) var(--space-5);
    margin: var(--space-3) 0 0;
    padding: 0;

    list-style: none;
    color: var(--color-muted);
    font-size: var(--text-xs);
  }

  .atlas-marker-legend li {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }

  .atlas-marker-legend svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    fill: var(--color-travel);
  }

  .atlas-marker-legend .legend-ring {
    fill: none;
    stroke: var(--color-white);
    stroke-width: 0.7;
  }

  .atlas-marker-legend text {
    fill: var(--color-white);
    font-size: 10px;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .travel-atlas {
      width: min(1200px, calc(100vw - 2 * var(--space-3)));
    }

    .atlas-toolbar {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .atlas-search {
      grid-column: 1 / -1;
    }

    .atlas-stats {
      gap: var(--space-3);
    }

    .atlas-marker-legend {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-2) var(--space-3);

      width: fit-content;
      max-width: 100%;
      margin-inline: auto;
    }

    .atlas-marker-legend li {
      min-width: 0;
    }
  }
</style>
