<script lang="ts">
  import { onMount } from "svelte";
  import { timeline } from "$lib/data/about/timeline.data";
  import TimelineItem from "./TimelineItem.svelte";

  let container: HTMLElement;

  let progress = $state(0);
  let visibleItems = $state<boolean[]>(timeline.map(() => false));

  // 📌 cache de posiciones absolutas (solo recalculadas en resize)
  let itemTops: number[] = [];

  let containerTop = 0;
  let containerHeight = 0;

  const measure = () => {
    if (!container) return;

    const rect = container.getBoundingClientRect();
    containerTop = rect.top + window.scrollY;
    containerHeight = rect.height;

    const items = container.querySelectorAll<HTMLElement>(".timeline-item");

    itemTops = Array.from(items, (el) => {
      return el.getBoundingClientRect().top + window.scrollY;
    });
  };

  const update = () => {
    const middle = window.scrollY + window.innerHeight / 2;

    // 📊 progress (idéntico a tu lógica original)
    const raw = middle - containerTop;
    progress = Math.max(0, Math.min(raw, containerHeight));

    // 👁 visibilidad exacta como antes
    visibleItems = itemTops.map((top) => middle >= top + 40);
  };

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  const onResize = () => {
    measure();
    update();
  };

  onMount(() => {
    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  });
</script>

<section class="timeline" bind:this={container}>
  <div class="timeline-line"></div>

  <div class="timeline-progress" style={`height: ${progress}px`}></div>

  {#each timeline as item, index (item.id)}
    <TimelineItem
      {item}
      side={index % 2 === 0 ? "left" : "right"}
      active={visibleItems[index]}
    />
  {/each}
</section>
