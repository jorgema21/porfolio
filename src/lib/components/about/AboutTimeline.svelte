<script lang="ts">
  import { timeline } from "$lib/data/about/timeline.data";
  import { t } from "$lib/i18n/index.svelte";

  let container = $state<HTMLElement | null>(null);
  let progress = $state(0);
  let visibleItems = $state<boolean[]>(timeline.map(() => false));

  let isAtBottom = $state(false);

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
    visibleItems = itemTops.map((top) => middle >= top + 60);

    isAtBottom = progress >= containerHeight - 20;
  };

  const scrollToBottom = () => {
    if (!container) return;
    const targetY = containerTop + containerHeight - window.innerHeight / 2;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
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

  $effect(() => {
    if (!container) return;
    const observer = new ResizeObserver(() => {
      measure();
      update();
    });
    observer.observe(container);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  });
</script>

<section class="timeline" bind:this={container}>
  <div class="timeline-line"></div>
  <div class="timeline-progress" style:height="{progress}px"></div>

  {#each timeline as item, index (item.id)}
    {@const side = index % 2 === 0 ? "left" : "right"}
    {@const active = visibleItems[index]}

    <article
      class="timeline-item {side}"
      class:visible={active}
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

  <button
  class="timeline-skip-btn"
  class:hidden={isAtBottom}
  onclick={scrollToBottom}
  aria-label={t.timelineUI.aria.skipToBottom}
>
    <svg
      xmlns="http://w3.org"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
    <span>{t.timelineUI.goToBottom}</span>
  </button>
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
    --timeline-color: var(--color-study);
  }
  .timeline-item[data-category="infography"] {
    --timeline-color: var(--color-infography);
  }
  .timeline-item[data-category="style"] {
    --timeline-color: var(--color-style);
  }
  .timeline-item[data-category="parenting"] {
    --timeline-color: var(--color-parenting);
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

  .timeline-skip-btn {
    position: fixed;
    bottom: var(--space-12);
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;

    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);

    border: var(--border-1);
    border-radius: var(--radius-full);
    background: var(--color-white);
    color: var(--color-text);

    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);

    transition:
      opacity 400ms var(--ease-out),
      transform 400ms var(--ease-out),
      background-color 200ms ease;
    will-change: opacity, transform;
  }

  .timeline-skip-btn svg {
    width: 14px;
    height: 14px;
    animation: pulseArrow 2s infinite ease-in-out;
  }

  .timeline-skip-btn:hover {
    background: var(--color-muted-background, #f3f4f6);
  }

  .timeline-skip-btn.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) translateY(20px);
  }

  @keyframes pulseArrow {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(3px);
    }
  }

  @media (max-width: 768px) {
    .timeline-skip-btn {
      bottom: var(--space-4);
    }
  }
</style>
