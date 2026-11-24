<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";
  import type { getAtlasCoverage } from "#lib/utils/travel-atlas.js";
  import type { AtlasPlace } from "#lib/types/travel-atlas.types.js";

  type Coverage = ReturnType<typeof getAtlasCoverage>;
  type Lang = keyof AtlasPlace["name"];

  interface Props {
    selectedPlace: AtlasPlace | null;
    path: AtlasPlace[];
    coverage: Coverage;
    lang: Lang;
    accentColor: string;
    onselect: (placeId: string | null) => void;
  }

  let { selectedPlace, path, coverage, lang, accentColor, onselect }: Props =
    $props();

  let showAllArticles = $state(false);

  let previousPlaceId: string | null | undefined;

  const articleListId = $props.id();

  let visibleArticles = $derived(
    showAllArticles ? coverage.articles : coverage.articles.slice(0, 1),
  );

  $effect(() => {
    const currentPlaceId = selectedPlace?.id;

    if (currentPlaceId !== previousPlaceId) {
      previousPlaceId = currentPlaceId;
      showAllArticles = false;
    }
  });
</script>

<aside
  class="boarding-pass"
  aria-label={t.travelAtlas.aria.destinationCard}
  style:--atlas-accent={accentColor}
>
  <div class="ticket-identity">
    {#if selectedPlace}
      <nav class="ticket-path" aria-label={t.travelAtlas.aria.geographicPath}>
        <button type="button" onclick={() => onselect(null)}>
          {t.travelAtlas.allDestinations}
        </button>

        {#each path.slice(0, -1) as ancestor (ancestor.id)}
          <span aria-hidden="true">/</span>

          <button type="button" onclick={() => onselect(ancestor.id)}>
            {ancestor.name[lang]}
          </button>
        {/each}
      </nav>
    {/if}

    <h3>
      {selectedPlace ? selectedPlace.name[lang] : t.travelAtlas.allDestinations}
    </h3>
  </div>

  <div class="ticket-editorial">
    {#if selectedPlace}
      <p class="ticket-caption">
        {coverage.articleCount}
        {coverage.articleCount === 1
          ? t.travelAtlas.articles.one
          : t.travelAtlas.articles.other}
      </p>

      {#if coverage.articles.length > 0}
        <ul class="article-list" id={articleListId}>
          {#each visibleArticles as match (match.article.id)}
            <li class="article-item">
              <h4>
                {#if match.article.externalUrl}
                  <a
                    href={match.article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {match.title[lang]}
                    <span aria-hidden="true">↗</span>
                    <span class="visually-hidden">
                      {t.travelAtlas.aria.newTab}
                    </span>
                  </a>
                {:else}
                  {match.title[lang]}
                {/if}
              </h4>

              {#if match.article.mediumStyle}
                <p class="article-medium">
                  {match.article.mediumStyle}
                </p>
              {/if}
            </li>
          {/each}
        </ul>

        {#if coverage.articles.length > 1}
          <button
            class="ticket-more"
            type="button"
            aria-expanded={showAllArticles}
            aria-controls={articleListId}
            onclick={() => (showAllArticles = !showAllArticles)}
          >
            {showAllArticles
              ? t.travelAtlas.ticketList.lessArticles
              : t.travelAtlas.ticketList.moreArticles.replace(
                  "{count}",
                  String(coverage.articles.length - 1),
                )}

            <span aria-hidden="true">
              {showAllArticles ? "−" : "+"}
            </span>
          </button>
        {/if}
      {:else}
        <p class="ticket-message">
          {t.travelAtlas.emptyArticles}
        </p>
      {/if}
    {:else}
      <p class="ticket-message">
        {t.travelAtlas.selectPrompt}
      </p>
    {/if}
  </div>
</aside>

<style>
  .boarding-pass {
    --atlas-tint: color-mix(
      in oklch,
      var(--atlas-accent) 7%,
      var(--color-white)
    );

    --ticket-perforation: color-mix(
      in oklch,
      var(--atlas-accent) 35%,
      transparent
    );

    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);

    min-width: 0;
    overflow: hidden;

    border-left: 10px solid var(--atlas-accent);
    border-radius: var(--radius-lg);

    background: var(--atlas-tint);
    color: var(--color-text);
  }

  .ticket-identity,
  .ticket-editorial {
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-width: 0;
    padding: var(--space-4) var(--space-5);
  }

  .ticket-identity {
    gap: var(--space-1);
  }

  .ticket-path {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    gap: 0 var(--space-2);

    color: var(--color-muted);
    font-size: var(--text-xs);
  }

  .ticket-path button {
    min-height: 32px;
    padding: 0;

    border: 0;
    background: transparent;

    color: inherit;
    font: inherit;
    text-align: left;
    text-decoration: underline;
    text-underline-offset: 0.2em;

    cursor: pointer;
  }

  h3,
  h4,
  p {
    margin: 0;
  }

  h3 {
    font-family: var(--font-serif);
    font-size: var(--text-2xl);
    line-height: var(--lh-titles);
    overflow-wrap: anywhere;
  }

  .ticket-editorial {
    position: relative;

    gap: var(--space-2);

    border-left: 2px dashed var(--ticket-perforation);
  }

  .ticket-editorial::before,
  .ticket-editorial::after {
    content: "";
    position: absolute;

    left: -10px;

    width: 18px;
    height: 18px;

    border-radius: 50%;
    background: var(--color-white);

    pointer-events: none;
  }

  .ticket-editorial::before {
    top: -9px;
  }

  .ticket-editorial::after {
    bottom: -9px;
  }

  .ticket-caption {
    color: var(--color-muted);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .article-list {
    display: grid;
    gap: var(--space-3);

    margin: 0;
    padding: 0;

    list-style: none;
  }

  .article-item {
    display: grid;
    gap: var(--space-1);
  }

  .article-item + .article-item {
    padding-top: var(--space-3);
    border-top: 1px solid var(--ticket-perforation);
  }

  h4 {
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    line-height: var(--lh-titles);
    overflow-wrap: anywhere;
  }

  .article-item a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }

  .article-item a:hover {
    color: var(--atlas-accent);
  }

  .article-medium,
  .ticket-message {
    color: var(--color-muted);
    font-size: var(--text-sm);
    line-height: var(--lh-base);
  }

  .ticket-more {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: var(--space-2);

    min-height: 44px;
    padding: 0;

    border: 0;
    background: transparent;

    color: var(--color-text);
    font: inherit;
    font-size: var(--text-sm);
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.2em;

    cursor: pointer;
  }

  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--atlas-accent);
    outline-offset: 3px;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .boarding-pass {
      grid-template-columns: minmax(0, 1fr);
    }

    .ticket-identity,
    .ticket-editorial {
      padding: var(--space-3) var(--space-4);
    }

    .ticket-editorial {
      border-left: 0;
      border-top: 2px dashed var(--ticket-perforation);
    }

    .ticket-editorial::before,
    .ticket-editorial::after {
      display: none;
    }

    .ticket-path button {
      min-height: 44px;
    }

    h3 {
      font-size: var(--text-xl);
    }
  }
</style>
