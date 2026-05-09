<script lang="ts">
  import { hierarchy, treemap, treemapSquarify } from "d3-hierarchy";
  import { scaleLinear } from "d3-scale";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  /* =========================
     TYPES
  ========================= */

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
    getLabel = (d: string) => d,
  } = $props<{
    data: TreemapItem[];
    width?: number;
    height?: number;
    getLabel?: (key: string) => string;
  }>();

  /* =========================
     STATE
  ========================= */

  let hovered = $state<TreemapItem | null>(null);
  let mouse = $state({ x: 0, y: 0 });

  /* =========================
     LAYOUT
  ========================= */

  const root = $derived(
    hierarchy<TreemapNode>({ children: data }).sum(
      (d: TreemapNode) => d.value ?? 0
    )
  );

  const layout = $derived(
    treemap<TreemapNode>()
      .size([width, height])
      .padding(4)
      .round(true)
      .tile(treemapSquarify)(root)
  );

  const leaves = $derived(
    layout.leaves().map((l) => ({
      x0: l.x0,
      x1: l.x1,
      y0: l.y0,
      y1: l.y1,
      data: {
        key: l.data.key ?? "",
        value: l.data.value ?? 0,
      },
    }))
  );

  /* =========================
     ANIMATION
  ========================= */

  const progress = tweened(0, {
    duration: 650,
    easing: cubicOut,
  });

  $effect(() => {
    progress.set(1);
  });

  /* =========================
     COLOR SCALE (REACTIVA Y TIPADA)
  ========================= */

  const values = $derived(
    data.map((d: TreemapItem) => d.value)
  );

  const maxValue = $derived(
    Math.max(...values, 1)
  );

  const colorScale = $derived(
    scaleLinear<string>()
      .domain([0, maxValue])
      .range(["#e6f0ff", "#1e3a8a"])
      .clamp(true)
  );

  const textColor = (value: number) =>
    value > maxValue * 0.4 ? "white" : "var(--color-text)";

  /* =========================
     TOOLTIP
  ========================= */

  const showTooltip = (d: TreemapItem, e: MouseEvent) => {
    hovered = d;
    mouse = { x: e.clientX, y: e.clientY };
  };
</script>

<!-- =========================
     SVG
========================= -->

<svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
  {#each leaves as leaf (leaf.data.key)}
    <g transform={`translate(${leaf.x0}, ${leaf.y0})`}>
      <rect
        width={(leaf.x1 - leaf.x0) * $progress}
        height={(leaf.y1 - leaf.y0) * $progress}
        rx="6"
        fill={colorScale(leaf.data.value)}
        opacity={$progress}
        role="img"
        aria-label={getLabel(leaf.data.key)}
        onmouseenter={(e) => showTooltip(leaf.data, e)}
        onmousemove={(e) => (mouse = { x: e.clientX, y: e.clientY })}
        onmouseleave={() => (hovered = null)}
      />

      {#if leaf.x1 - leaf.x0 > 60 && leaf.y1 - leaf.y0 > 30}
        <text
          x="8"
          y="18"
          font-size="12"
          fill={textColor(leaf.data.value)}
          opacity={$progress}
          pointer-events="none"
        >
          {getLabel(leaf.data.key)}
        </text>
      {/if}
    </g>
  {/each}
</svg>

<!-- =========================
     TOOLTIP
========================= -->

{#if hovered}
  <div
    class="tooltip"
    style="top:{mouse.y + 10}px; left:{mouse.x + 10}px"
  >
    <strong>{getLabel(hovered.key)}</strong><br />
    {hovered.value}
  </div>
{/if}



