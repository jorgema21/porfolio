<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";

  import type { Lang } from "#lib/types/project.types.js";
  import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

  import type {
    AtlasFilter,
    AtlasIndex,
  } from "#lib/utils/travel-atlas/index.js";

  import {
    getAtlasDestinationList,
    getAtlasSearchPath,
    searchAtlasDestinations,
  } from "#lib/utils/travel-atlas/search.js";

  interface Props {
    index: AtlasIndex;
    lang: Lang;
    selectedId: string | null;
    filter: AtlasFilter;
    onselect: (place: AtlasPlace) => void;
  }

  let {
    index,
    lang,
    selectedId,
    filter = $bindable(),
    onselect,
  }: Props = $props();

  let searchQuery = $state("");
  let destinationListOpen = $state(false);

  let destinationList = $derived(getAtlasDestinationList(index, lang));

  let searchResults = $derived(
    searchAtlasDestinations(index, destinationList, searchQuery, lang),
  );

  function selectSearchResult(place: AtlasPlace): void {
    onselect(place);
    searchQuery = "";
  }

  function selectListDestination(place: AtlasPlace): void {
    onselect(place);
    destinationListOpen = false;
  }
</script>

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
            <button type="button" onclick={() => selectSearchResult(place)}>
              <span class="atlas-search-name">
                {place.name[lang]}
              </span>

              {#if place.parentId}
                <span class="atlas-search-path">
                  {getAtlasSearchPath(index, place.id, lang)}
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
            onclick={() => selectListDestination(place)}
          >
            <span class="atlas-destination-name">
              {place.name[lang]}
            </span>

            {#if place.parentId}
              <span class="atlas-destination-path">
                {getAtlasSearchPath(index, place.id, lang)}
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

<style>
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

  .filter-control {
    display: grid;
    gap: var(--space-2);
    min-width: 0;
    font-size: var(--text-sm);
    font-weight: 700;
  }

  select {
    box-sizing: border-box;
    width: 100%;
    min-height: 44px;
    padding: var(--space-2) var(--space-3);

    border: var(--border-1);
    border-radius: var(--radius-sm);
    background: var(--color-white);

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
  .atlas-search input:focus-visible,
  .atlas-destination-list summary:focus-visible {
    outline: 2px solid var(--atlas-accent);
    outline-offset: 3px;
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
  }

  .atlas-search-results button:hover,
  .atlas-search-results button:focus-visible,
  .atlas-destination-options button:hover,
  .atlas-destination-options button:focus-visible,
  .atlas-destination-options button[aria-current="location"] {
    background: var(--bg-soft);
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

  @media (max-width: 640px) {
    .atlas-toolbar {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .atlas-search {
      grid-column: 1 / -1;
    }
  }
</style>
