<script lang="ts">
  import { hierarchy, treemap, treemapSquarify } from "d3-hierarchy";
  import { scaleLinear } from "d3-scale";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export type TreemapItem<K extends string = string> = {
    key: K;
    value: number;
  };

  type TreemapNode = {
    key?: string;
    value?: number;
    children?: TreemapNode[];
  };

  const {
    data = [],
    width = 400,
    height = 250,
    title = "",
    getLabel = (d: string) => d,
  } = $props<{
    data: TreemapItem[];
    width?: number;
    height?: number;
    title?: string;
    getLabel?: (key: string) => string;
  }>();

  let hovered = $state<TreemapItem | null>(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  const progress = tweened(0, {
    duration: 650,
    easing: cubicOut,
  });

  $effect(() => {
    progress.set(1);
  });

  const root = $derived.by(() => {
    const baseHierarchy = hierarchy<TreemapNode>({ children: data });
    return baseHierarchy.sum((d: TreemapNode) => d.value ?? 0);
  });

  const layout = $derived(
    treemap<TreemapNode>()
      .size([width, height])
      .padding(4)
      .round(true)
      .tile(treemapSquarify)(root),
  );

  const leaves = $derived(
    layout.leaves().map((l) => ({
      x: l.x0,
      y: l.y0,
      w: l.x1 - l.x0,
      h: l.y1 - l.y0,
      key: l.data.key ?? "",
      value: l.data.value ?? 0,
    })),
  );

  const colorMeta = $derived.by(() => {
    if (data.length === 0) return { scale: () => "#e6f0ff", max: 1 };

    const max = Math.max(...data.map((d: TreemapItem) => d.value), 1);

    const scale = scaleLinear<string>()
      .domain([0, max])
      .range(["#e6f0ff", "#1e3a8a"])
      .clamp(true);

    return { scale, max };
  });

  const getTextColor = (value: number) =>
    value > colorMeta.max * 0.4 ? "var(--color-white)" : "var(--color-text)";

  const updateMouse = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const handleEnter = (leaf: (typeof leaves)[number], e: MouseEvent) => {
    hovered = { key: leaf.key, value: leaf.value };
    updateMouse(e);
  };
</script>

<div class="treemap-wrapper">
  {#if title}
    <h3 class="treemap-title">{title}</h3>
  {/if}

  <svg viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
    {#each leaves as leaf (leaf.key)}
      <g transform="translate({leaf.x}, {leaf.y})">
        <rect
          width={leaf.w * $progress}
          height={leaf.h * $progress}
          rx="6"
          fill={colorMeta.scale(leaf.value)}
          opacity={$progress}
          role="img"
          aria-label="{getLabel(leaf.key)}: {leaf.value}"
          class="treemap-rect"
          onmouseenter={(e) => handleEnter(leaf, e)}
          onmousemove={updateMouse}
          onmouseleave={() => (hovered = null)}
        />

        <!-- Renderizamos el texto usando HTML nativo dentro del SVG -->
        {#if leaf.w * $progress > 50 && leaf.h * $progress > 30}
          <foreignObject
            x="8"
            y="6"
            width={leaf.w * $progress - 16}
            height={leaf.h * $progress - 12}
            pointer-events="none"
          >
            <div
              class="treemap-text-container"
              style:color={getTextColor(leaf.value)}
              style:opacity={$progress}
            >
              {getLabel(leaf.key)}
            </div>
          </foreignObject>
        {/if}
      </g>
    {/each}
  </svg>
</div>

{#if hovered}
  <div class="tooltip" style:top="{mouseY + 10}px" style:left="{mouseX + 10}px">
    <strong>{getLabel(hovered.key)}</strong><br />
    {hovered.value}
  </div>
{/if}

<style>
  .treemap-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .treemap-title {
    margin: 0;
    font: var(--text-sm) var(--font-sans);
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-text);
  }

  svg {
    display: block;
    max-width: 100%;
    overflow: hidden;
  }

  .treemap-rect {
    cursor: pointer;
    will-change: width, height, opacity;
    transition:
      width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      fill 0.3s ease,
      opacity var(--transition-fast);

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.85;
    }

    &:focus-visible {
      outline: 2px solid var(--blue-700);
      outline-offset: -2px;
    }
  }

  .treemap-text-container {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 11px;
    line-height: 1.2;
    user-select: none;

    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tooltip {
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    background: var(--color-muted);
    color: var(--color-white);
    font-size: var(--text-xs);
    box-shadow: 0 8px 20px rgb(0 0 0 / 20%);
    will-change: top, left;
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast);
  }

  @media (max-width: 768px) {
    svg {
      width: 100%;
      height: auto;
    }

    .tooltip {
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-3);
      max-width: 80vw;
      white-space: normal;
    }
  }
  @media (max-width: 400px) {
    .treemap-text-container {
      font-size: var(--text-xs);
    }
  }
</style>
