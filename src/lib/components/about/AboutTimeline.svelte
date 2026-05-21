<script lang="ts">
  import { timeline } from "$lib/data/about/timeline.data";
  import { t } from "$lib/i18n/index.svelte";

  let container = $state<HTMLElement | null>(null);
  let progress = $state(0);
  let visibleItems = $state<boolean[]>(timeline.map(() => false));

  let itemTops: number[] = [];
  let containerTop = 0;
  let containerHeight = 0;

  const measure = () => {
    if (!container) return;

    const rect = container.getBoundingClientRect();
    containerTop = rect.top + window.scrollY;
    containerHeight = rect.height;

    const items = container.querySelectorAll<HTMLElement>(".timeline-item");
    itemTops = Array.from(
      items,
      (el) => el.getBoundingClientRect().top + window.scrollY,
    );
  };

  const update = () => {
    const middle = window.scrollY + window.innerHeight / 2;

    const raw = middle - containerTop;
    progress = Math.max(0, Math.min(raw, containerHeight));

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

  $effect(() => {
    if (!container) return;

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
    {@const side = index % 2 === 0 ? "left" : "right"}
    {@const active = visibleItems[index]}

    <article
      class={["timeline-item", side, active && "visible"]
        .filter(Boolean)
        .join(" ")}
      data-category={item.category}
    >
      <div class="timeline-branch"></div>
      <div class="timeline-dot"></div>

      <div class="timeline-card">
        <span class="timeline-date">{item.date}</span>
        <h3>{t.timeline[item.id].title}</h3>
        <p>{t.timeline[item.id].description}</p>
      </div>
    </article>
  {/each}
</section>

<style>
  .timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    width: calc(100% - (var(--space-8) * 2));
    max-width: var(--content-width);
    margin-inline: auto;
    padding-block: var(--space-12);
  }

  .timeline-line,
  .timeline-progress {
    position: absolute;
    top: 0;
    left: 50%;
    width: var(--space-1);
    transform: translateX(-50%);
  }

  .timeline-line {
    height: 100%;
    opacity: 0.35;
    background: transparent;
  }

  .timeline-progress {
    height: 0;
    background: var(--color-border);
    z-index: 2;
    transition: height 120ms linear;
    will-change: height;
  }

  .timeline-item {
    position: relative;
    width: 50%;
    --timeline-color: var(--color-border);
    color: var(--timeline-color);
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 700ms var(--ease-out),
      transform 700ms var(--ease-out);
    will-change: opacity, transform;
  }

  .timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .timeline-item[data-category="study"] {
    --timeline-color: var(--timeline-study);
  }
  .timeline-item[data-category="infography"] {
    --timeline-color: var(--timeline-infography);
  }
  .timeline-item[data-category="style"] {
    --timeline-color: var(--timeline-style);
  }
  .timeline-item[data-category="motherhood"] {
    --timeline-color: var(--timeline-motherhood);
  }
  .timeline-item.left {
    right: 5%;
    text-align: right;
    align-self: flex-start;
  }

  .timeline-item.right {
    left: 5%;
    text-align: left;
    align-self: flex-end;
  }
  .timeline-branch {
    position: absolute;
    top: var(--space-4);
    width: 60%;
    height: 4px;
    background: currentColor;
    opacity: 0.3;
    transform: scaleX(0);
    z-index: 1;
    transition: transform 500ms var(--ease-out);
  }

  .timeline-item.left .timeline-branch {
    left: 50%;
    transform-origin: right center;
  }

  .timeline-item.right .timeline-branch {
    right: 50%;
    transform-origin: left center;
  }

  .timeline-item.visible .timeline-branch {
    transform: scaleX(1);
  }
  .timeline-dot {
    position: absolute;
    top: var(--space-3);
    left: 50%;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    background: currentColor;
    z-index: 3;
  }
  .timeline-card {
    position: relative;
    padding: var(--space-4);
    margin: var(--space-4) 0;
    border: var(--border-1);
    border-bottom: 1px solid currentColor;
    border-radius: var(--radius-lg);
    background: var(--color-white);
    backdrop-filter: blur(6px);
    transition:
      transform var(--transition),
      box-shadow var(--transition);
  }

  .timeline-date {
    display: inline-block;
    margin-bottom: var(--space-2);
    font-size: var(--text-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .timeline-card h3 {
    margin: 0;
    font-size: var(--text-base);
    line-height: var(--lh-titles);
    color: currentColor;
  }

  .timeline-card p {
    margin-top: var(--space-3);
    line-height: var(--lh-base);
    color: var(--color-muted);
    font-size: var(--text-sm);
  }

  @media (max-width: 768px) {
    .timeline {
      padding-inline: var(--space-4);
      gap: var(--space-6);
    }

    .timeline-item {
      width: 100%;
      align-self: center;
      text-align: center;
      transform: translateY(24px);
    }

    .timeline-item.left,
    .timeline-item.right {
      left: auto;
      right: auto;
    }

    .timeline-branch {
      display: none;
    }

    .timeline-dot {
      left: 50%;
      transform: translateX(-50%);
    }

    .timeline-card {
      margin-inline: auto;
      max-width: 100%;
      text-align: left;
    }

    .timeline-line,
    .timeline-progress {
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
    }

    .timeline-item.visible {
      transform: translateY(0);
    }
  }
</style>
