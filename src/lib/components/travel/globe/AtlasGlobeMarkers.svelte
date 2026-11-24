<script lang="ts">
  import {
    getAtlasMarkerSize,
    type GlobeMarker,
  } from "#lib/utils/travel-atlas/globe/markers.js";

  interface Props {
    markers: readonly GlobeMarker[];
    selectedPlaceId: string | null;
  }

  let { markers, selectedPlaceId }: Props = $props();

  let orderedMarkers = $derived(
    [...markers].sort((a, b) => {
      const aSelected = a.placeId === selectedPlaceId;
      const bSelected = b.placeId === selectedPlaceId;

      return Number(aSelected) - Number(bSelected);
    }),
  );
</script>

<g>
  {#each orderedMarkers as marker (marker.id)}
    {#if marker.count === 1}
      {#if marker.relevance === "detailed"}
        <rect
          class="article-marker"
          class:selected={marker.placeId === selectedPlaceId}
          class:inactive={marker.activeCount === 0}
          x={marker.x - getAtlasMarkerSize(marker.articleCount)}
          y={marker.y - getAtlasMarkerSize(marker.articleCount)}
          width={getAtlasMarkerSize(marker.articleCount) * 2}
          height={getAtlasMarkerSize(marker.articleCount) * 2}
          rx="0.5"
        />
      {:else if marker.relevance === "mention"}
        <polygon
          class="article-marker"
          class:selected={marker.placeId === selectedPlaceId}
          class:inactive={marker.activeCount === 0}
          points={`${marker.x},${marker.y - getAtlasMarkerSize(marker.articleCount) * 1.2} ${marker.x + getAtlasMarkerSize(marker.articleCount) * 1.14},${marker.y + getAtlasMarkerSize(marker.articleCount) * 0.93} ${marker.x - getAtlasMarkerSize(marker.articleCount) * 1.14},${marker.y + getAtlasMarkerSize(marker.articleCount) * 0.93}`}
        />
      {:else}
        <circle
          class="article-marker"
          class:selected={marker.placeId === selectedPlaceId}
          class:inactive={marker.activeCount === 0}
          cx={marker.x}
          cy={marker.y}
          r={getAtlasMarkerSize(marker.articleCount)}
        />
      {/if}
    {:else}
      <g
        class="article-cluster"
        class:inactive={marker.activeCount === 0}
        transform={`translate(${marker.x} ${marker.y}) scale(0.85) translate(${-marker.x} ${-marker.y})`}
      >
        <circle class="cluster-core" cx={marker.x} cy={marker.y} r="10" />

        <circle
          class="cluster-ring-track"
          cx={marker.x}
          cy={marker.y}
          r="12.5"
        />

        <circle
          class="cluster-ring-active"
          cx={marker.x}
          cy={marker.y}
          r="12.5"
          stroke-dasharray={`${(marker.activeCount / marker.count) * (2 * Math.PI * 12.5)} ${2 * Math.PI * 12.5}`}
          transform={`rotate(-90 ${marker.x} ${marker.y})`}
        />

        <text
          class="cluster-count"
          x={marker.x}
          y={marker.y}
          text-anchor="middle"
          dominant-baseline="central"
        >
          {marker.count}
        </text>
      </g>
    {/if}
  {/each}
</g>

<style>
  .article-marker {
    fill: var(--color-travel);
    stroke: var(--color-white);
    stroke-width: 0.8;
    opacity: 0.95;
    transition: opacity 180ms ease;
  }

  .article-marker.inactive,
  .article-cluster.inactive {
    opacity: 0.12;
  }

  .article-marker.selected,
  .article-marker.selected.inactive {
    fill: var(--color-text);
    stroke: var(--color-white);
    stroke-width: 1.2;
    opacity: 1;
  }

  .article-cluster {
    opacity: 1;
    transition: opacity 180ms ease;
  }

  .cluster-core {
    fill: var(--color-travel);
    stroke: var(--color-white);
    stroke-width: 0.8;
  }

  .cluster-ring-track {
    fill: none;
    stroke: var(--color-travel);
    stroke-opacity: 0.2;
    stroke-width: 2.5;
  }

  .cluster-ring-active {
    fill: none;
    stroke: var(--color-travel);
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  .cluster-count {
    fill: var(--color-white);
    font-size: 10px;
    font-weight: 700;
    pointer-events: none;
    user-select: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .article-marker,
    .article-cluster {
      transition: none;
    }
  }
</style>
