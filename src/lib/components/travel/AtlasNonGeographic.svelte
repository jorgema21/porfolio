<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";

  import type { Lang } from "#lib/types/project.types.js";
  import type { AtlasArticle } from "#lib/types/travel-atlas.types.js";

  interface Props {
    articles: readonly AtlasArticle[];
    lang: Lang;
  }

  let { articles, lang }: Props = $props();
</script>

{#if articles.length > 0}
  <section
    class="atlas-non-geographic"
    aria-labelledby="atlas-non-geographic-title"
  >
    <h3 id="atlas-non-geographic-title">
      {t.travelAtlas.nonGeographic.title}
    </h3>

    <p>{t.travelAtlas.nonGeographic.description}</p>

    <ul>
      {#each articles as article (article.id)}
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

<style>
  .atlas-non-geographic {
    margin-top: var(--space-6);
    padding-top: var(--space-5);
    border-top: var(--border-1);
  }

  h3 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    line-height: var(--lh-titles);
  }

  p {
    margin-block: var(--space-2) var(--space-4);
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    gap: var(--space-1);
  }

  a {
    color: var(--color-text);
    font-weight: 700;
    text-underline-offset: 0.2em;
  }

  a:focus-visible {
    outline: 2px solid var(--atlas-accent);
    outline-offset: 3px;
  }

  .atlas-article-medium {
    color: var(--color-muted);
    font-size: var(--text-xs);
  }
</style>
