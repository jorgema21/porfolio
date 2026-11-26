<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";
</script>

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

<style>
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

  .legend-ring {
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
