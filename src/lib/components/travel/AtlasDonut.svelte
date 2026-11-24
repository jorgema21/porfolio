<script lang="ts">
  import type { Snippet } from "svelte";
  import { t } from "#lib/i18n/index.svelte.js";
  import type { AtlasDonutSegment } from "#lib/types/travel-atlas.types.js";

  interface Props {
    segments: readonly AtlasDonutSegment[];
    selectedId?: string | null;
    label: string;
    centerLabel: string;
    onselect: (id: string) => void;
    children?: Snippet;
  }

  let {
    segments,
    selectedId = null,
    label,
    centerLabel,
    onselect,
    children,
  }: Props = $props();

  const center = 160;
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const pathPrefix = $props.id();
  let stageWidth = $state(0);

  let targetLabelSize = $derived(Math.max(12, Math.min(16, stageWidth / 45)));

  let labelFontSize = $derived(
    Math.min(12, (targetLabelSize * 320) / (stageWidth || 560)),
  );

  let positiveSegments = $derived(
    segments.filter(
      (segment) => Number.isFinite(segment.value) && segment.value > 0,
    ),
  );

  let total = $derived(
    positiveSegments.reduce((sum, segment) => sum + segment.value, 0),
  );

  function estimateTextWidth(value: string): number {
    return Array.from(value).reduce((width, character) => {
      if (character === " ") return width + 2.8;
      if ("ilIjtfr.,'".includes(character)) return width + 3;
      if ("MWmwÁÉÓÚÑÜ".includes(character)) return width + 8;
      return width + 5.5;
    }, 0);
  }

  function getTextPath(
    offset: number,
    length: number,
    name: string,
  ): string | null {
    const available = Math.min(
      (circumference * length) / 100 - labelFontSize * 2,
      circumference / 2,
    );

    const textWidth = estimateTextWidth(name) * (labelFontSize / 10.4);

    if (textWidth + labelFontSize > available) return null;

    const midAngle = ((offset + length / 2) / 100) * Math.PI * 2 - Math.PI / 2;

    const halfAngle = available / (2 * radius);

    const bottomHalf = Math.sin(midAngle) > 0;

    const start = bottomHalf ? midAngle + halfAngle : midAngle - halfAngle;

    const end = bottomHalf ? midAngle - halfAngle : midAngle + halfAngle;

    function point(angle: number): string {
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      return `${x.toFixed(2)} ${y.toFixed(2)}`;
    }

    return `M ${point(start)} A ${radius} ${radius} 0 0 ${bottomHalf ? 0 : 1} ${point(end)}`;
  }

  let arcs = $derived.by(() => {
    let offset = 0;

    return positiveSegments.map((segment) => {
      const length = (segment.value / total) * 100;
      const arc = {
        ...segment,
        length,
        offset,
        textPath: getTextPath(offset, length, segment.label),
      };

      offset += length;
      return arc;
    });
  });

  let hoveredId = $state<string | null>(null);

  let activeArc = $derived(arcs.find((arc) => arc.id === hoveredId) ?? null);

  function placeLabel(value: number): string {
    return value === 1 ? t.travelAtlas.places.one : t.travelAtlas.places.other;
  }

  function handleKeydown(event: KeyboardEvent, id: string): void {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    onselect(id);
  }
</script>

<div class="donut">
  <div class="donut-context" aria-live="off">
    {#if activeArc}
      <span
        class="donut-context-color"
        style:background={activeArc.color}
        aria-hidden="true"
      ></span>
      <span class="donut-context-name">{activeArc.label}</span>
      <span class="donut-context-value">
        {activeArc.value}
        {placeLabel(activeArc.value)}
      </span>
    {/if}
  </div>

  <div class="donut-stage" bind:clientWidth={stageWidth}>
    <svg
      class="donut-svg"
      viewBox="0 0 320 320"
      role="group"
      aria-label={label}
    >
      <defs>
        {#each arcs as arc (arc.id)}
          {#if arc.textPath}
            <path id={`${pathPrefix}-${arc.id}`} d={arc.textPath} />
          {/if}
        {/each}
      </defs>

      <circle
        class="donut-track"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke-width="20"
        aria-hidden="true"
      />

      {#each arcs as arc (arc.id)}
        <circle
          class="donut-segment"
          class:is-selected={selectedId === arc.id}
          cx="160"
          cy="160"
          r="140"
          pathLength="100"
          fill="none"
          stroke={arc.color}
          stroke-width="20"
          stroke-dasharray={`${arc.length} ${100 - arc.length}`}
          stroke-dashoffset={-arc.offset}
          transform={`rotate(-90 ${center} ${center})`}
          role="button"
          tabindex="0"
          aria-label={`${arc.label}: ${arc.value} ${placeLabel(arc.value)}`}
          aria-current={selectedId === arc.id ? "location" : undefined}
          onclick={() => onselect(arc.id)}
          onkeydown={(event) => handleKeydown(event, arc.id)}
          onmouseenter={() => (hoveredId = arc.id)}
          onmouseleave={() => (hoveredId = null)}
          onfocus={() => (hoveredId = arc.id)}
          onblur={() => (hoveredId = null)}
        >
        </circle>
      {/each}

      <g class="donut-arc-labels" aria-hidden="true">
        {#each arcs as arc (arc.id)}
          {#if arc.textPath}
            <text
              class="donut-arc-label"
              style:font-size={`${labelFontSize}px`}
            >
              <textPath
                href={`#${pathPrefix}-${arc.id}`}
                startOffset="50%"
                text-anchor="middle">{arc.label}</textPath
              >
            </text>
          {/if}
        {/each}
      </g>
    </svg>

    <div class="donut-center">
      {#if children}
        {@render children()}
      {:else}
        <div class="center-placeholder">
          <span class="center-caption">{t.travelAtlas.destinationsIn}</span>
          <strong>{centerLabel}</strong>
          <span class="center-total">
            {total}
            {placeLabel(total)}
          </span>
        </div>
      {/if}
    </div>
  </div>

  {#if total === 0}
    <p class="empty-message">{t.travelAtlas.emptyPlaces}</p>
  {/if}
</div>

<style>
  .donut {
    min-width: 0;
  }

  .donut-context {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;

    gap: var(--space-2);
    height: 28px;
    margin-bottom: 0;
    padding-inline: var(--space-2);

    color: var(--color-text);
    font-size: var(--text-sm);
    text-align: center;
    white-space: nowrap;
  }

  .donut-context-color {
    flex: 0 0 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .donut-context-name {
    font-weight: 700;
    line-height: var(--lh-compact);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .donut-context-value {
    color: var(--color-muted);
    font-size: var(--text-sm);
    font-variant-numeric: tabular-nums;
  }

  .donut-stage {
    position: relative;
    width: 100%;
    max-width: var(--atlas-donut-max-width, 560px);
    margin-inline: auto;
    aspect-ratio: 1;
  }

  .donut-svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .donut-track {
    stroke: var(--bg-soft);
  }

  .donut-segment {
    cursor: pointer;
    pointer-events: visibleStroke;
  }

  .donut-segment:hover {
    filter: brightness(0.9);
  }

  .donut-segment.is-selected {
    stroke-width: 25;
  }

  .donut-segment:focus-visible {
    outline: none;
    stroke-width: 28;
  }

  .donut-arc-labels {
    pointer-events: none;
  }

  .donut-arc-label {
    fill: #ffffff;
    stroke: rgb(0 0 0 / 75%);
    stroke-width: 0.1em;
    stroke-linejoin: round;
    paint-order: stroke;

    font-family: var(--font-sans);
    font-weight: 700;
    letter-spacing: 0;
    dominant-baseline: middle;
  }

  .donut-center {
    position: absolute;
    inset: 12%;
    overflow: hidden;
    border-radius: 50%;

    box-shadow:
      0 3px 10px rgb(25 45 55 / 9%),
      0 1px 3px rgb(25 45 55 / 5%);
  }

  .center-placeholder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    height: 100%;
    padding: var(--space-4);
    background: var(--bg-soft);
    text-align: center;
  }

  .center-caption {
    color: var(--color-muted);
    font-size: var(--text-xs);
  }

  .center-placeholder strong {
    max-width: 100%;
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    line-height: var(--lh-titles);
    overflow-wrap: anywhere;
  }

  .center-total {
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  .empty-message {
    color: var(--color-muted);
    text-align: center;
  }
  @media (max-width: 640px) {
    .donut-context {
      height: 24px;
      min-height: 24px;
      margin-bottom: 0;
      font-size: var(--text-xs);
    }
  }
</style>
