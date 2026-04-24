<script lang="ts">
  import {
    hierarchy,
    treemap,
    treemapSquarify,
    type HierarchyNode,
  } from "d3-hierarchy";

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

  let hovered = $state<TreemapItem | null>(null);
  let mouse = $state({ x: 0, y: 0 });

  const root = $derived(
    hierarchy<TreemapNode>({ children: data }).sum((d) => d.value ?? 0),
  );

  const layout = $derived(
    treemap<TreemapNode>()
      .size([width, height])
      .padding(4)
      .round(true)
      .tile(treemapSquarify)(root),
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
    })),
  );
</script>

<svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
  {#each leaves as leaf (leaf.data.key)}
    <g transform={`translate(${leaf.x0}, ${leaf.y0})`}>
      <rect
        width={leaf.x1 - leaf.x0}
        height={leaf.y1 - leaf.y0}
        rx="6"
        fill="var(--blue-300)"
        role="img"
        aria-label={getLabel(leaf.data.key)}
        onmouseenter={(e) => {
          hovered = leaf.data;
          mouse = { x: e.clientX, y: e.clientY };
        }}
        onmousemove={(e) => {
          mouse = { x: e.clientX, y: e.clientY };
        }}
        onmouseleave={() => (hovered = null)}
      />

      {#if leaf.x1 - leaf.x0 > 60 && leaf.y1 - leaf.y0 > 30}
        <text x="8" y="18" font-size="12" fill="white" pointer-events="none">
          {getLabel(leaf.data.key)}
        </text>
      {/if}
    </g>
  {/each}
</svg>

{#if hovered}
  <div class="tooltip" style={`top:${mouse.y + 10}px; left:${mouse.x + 10}px`}>
    <strong>{getLabel(hovered.key)}</strong><br />
    {hovered.value}
  </div>
{/if}
