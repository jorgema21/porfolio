<script lang="ts">
  import { onMount } from "svelte";

  import { timeline } from "$lib/data/about/timeline.data";

  import TimelineItem from "./TimelineItem.svelte";

  let container: HTMLElement;

  let progress = $state(0);

  let visibleItems = $state<boolean[]>(timeline.map(() => false));

  const updateTimeline = () => {
    if (!container) return;

    requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();

      const containerTop = rect.top + window.scrollY;

      const middle = window.scrollY + window.innerHeight / 2;

      progress = Math.max(0, Math.min(middle - containerTop, rect.height));

      const items = container.querySelectorAll<HTMLElement>(".timeline-item");

      visibleItems = Array.from(items, (el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;

        return middle >= top + 40;
      });
    });
  };

  onMount(() => {
    updateTimeline();

    window.addEventListener("scroll", updateTimeline, { passive: true });

    window.addEventListener("resize", updateTimeline);

    return () => {
      window.removeEventListener("scroll", updateTimeline);

      window.removeEventListener("resize", updateTimeline);
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
