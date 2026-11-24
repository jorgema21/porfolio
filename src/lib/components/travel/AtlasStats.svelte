<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";

  import type { AtlasCoverage } from "#lib/utils/travel-atlas/index.js";

  interface Props {
    coverage: Pick<
      AtlasCoverage,
      "articleCount" | "placeCount" | "countryCount"
    >;
  }

  let { coverage }: Props = $props();
</script>

<dl class="atlas-stats">
  <div>
    <dt>
      {coverage.articleCount === 1
        ? t.travelAtlas.articleCountLabelOne
        : t.travelAtlas.articleCountLabel}
    </dt>
    <dd>{coverage.articleCount}</dd>
  </div>

  <div>
    <dt>
      {coverage.placeCount === 1
        ? t.travelAtlas.places.one
        : t.travelAtlas.places.other}
    </dt>
    <dd>{coverage.placeCount}</dd>
  </div>

  <div>
    <dt>
      {coverage.countryCount === 1
        ? t.travelAtlas.countriesCountLabelOne
        : t.travelAtlas.countriesCountLabel}
    </dt>
    <dd>{coverage.countryCount}</dd>
  </div>
</dl>

<style>
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

  dt {
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  dd {
    order: -1;
    margin: 0;
    font-size: var(--text-xl);
    font-weight: 700;
  }

  @media (max-width: 640px) {
    .atlas-stats {
      gap: var(--space-3);
    }
  }
</style>
