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

  let animationFrameId: number | null = null;
  let shouldMeasure = false;

  const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

  const measure = (element: HTMLElement): void => {
    const containerRect = element.getBoundingClientRect();

    containerTop = containerRect.top + window.scrollY;
    containerHeight = containerRect.height;

    const items = element.querySelectorAll<HTMLElement>(".timeline-item");

    itemTops = Array.from(items, (item) => {
      const itemRect = item.getBoundingClientRect();
      return itemRect.top + window.scrollY;
    });
  };

  const update = (): void => {
    if (containerHeight <= 0) return;

    const viewportMiddle = window.scrollY + window.innerHeight / 2;

    const rawProgress = viewportMiddle - containerTop;
    const progressInPixels = clamp(rawProgress, 0, containerHeight);

    const nextProgress = progressInPixels / containerHeight;

    if (progress !== nextProgress) {
      progress = nextProgress;
    }

    const nextVisibleItems = itemTops.map(
      (itemTop) => viewportMiddle >= itemTop + 60,
    );

    const visibilityChanged = nextVisibleItems.some(
      (isVisible, index) => isVisible !== visibleItems[index],
    );

    if (visibilityChanged) {
      visibleItems = nextVisibleItems;
    }

    const nextIsAtBottom = progressInPixels >= containerHeight - 20;

    if (isAtBottom !== nextIsAtBottom) {
      isAtBottom = nextIsAtBottom;
    }
  };

  const scheduleUpdate = (measureBeforeUpdate = false): void => {
    if (measureBeforeUpdate) {
      shouldMeasure = true;
    }

    if (animationFrameId !== null) return;

    animationFrameId = requestAnimationFrame(() => {
      animationFrameId = null;

      const element = container;
      if (!element) return;

      if (shouldMeasure) {
        measure(element);
        shouldMeasure = false;
      }

      update();
    });
  };

  const onScroll = (): void => {
    scheduleUpdate();
  };

  const onResize = (): void => {
    scheduleUpdate(true);
  };

  const scrollToBottom = (): void => {
    const element = container;
    if (!element) return;

    measure(element);

    const targetPosition =
      containerTop + containerHeight - window.innerHeight / 2;

    const maximumScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: clamp(targetPosition, 0, maximumScroll),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  $effect(() => {
    const element = container;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      scheduleUpdate(true);
    });

    resizeObserver.observe(element);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onResize, {
      passive: true,
    });

    window.visualViewport?.addEventListener("resize", onResize, {
      passive: true,
    });

    scheduleUpdate(true);

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      window.visualViewport?.removeEventListener("resize", onResize);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
  });
</script>

<section
  class="timeline"
  bind:this={container}
  style:--timeline-progress={progress}
>
  <div class="timeline-line" aria-hidden="true"></div>
  <div class="timeline-progress" aria-hidden="true"></div>

  {#each timeline as item, index (item.id)}
    {@const side = index % 2 === 0 ? "left" : "right"}
    {@const active = visibleItems[index] ?? false}

    <article
      class="timeline-item {side}"
      class:visible={active}
      data-category={item.category}
    >
      <div class="timeline-branch" aria-hidden="true"></div>
      <div class="timeline-dot" aria-hidden="true"></div>

      <div class="timeline-card">
        <span class="timeline-date">
          {item.date}
        </span>

        <h3>{t.timeline[item.id].title}</h3>

        <p>{t.timeline[item.id].description}</p>
      </div>
    </article>
  {/each}

  <button
    class="timeline-skip-btn"
    class:hidden={isAtBottom}
    type="button"
    onclick={scrollToBottom}
    disabled={isAtBottom}
    aria-hidden={isAtBottom}
    tabindex={isAtBottom ? -1 : 0}
    aria-label={t.timelineUI.aria.skipToBottom}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>

    <span>{t.timelineUI.goToBottom}</span>
  </button>
</section>

<style>
  .timeline {
    --timeline-progress: 0;

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
  }

  .timeline-line {
    height: 100%;
    opacity: 0.35;
    background: transparent;
    transform: translateX(-50%);
  }

  .timeline-progress {
    z-index: 2;
    height: 100%;
    background: var(--color-border);
    transform: translateX(-50%) scaleY(var(--timeline-progress));
    transform-origin: top center;
    transition: transform 120ms linear;
  }

  .timeline-item {
    --timeline-color: var(--color-border);

    position: relative;
    width: 50%;
    color: var(--timeline-color);
    opacity: 0;
    transform: translateY(50px);
    transition:
      opacity 700ms var(--ease-out),
      transform 700ms var(--ease-out);

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    &[data-category="study"] {
      --timeline-color: var(--color-study);
    }

    &[data-category="infography"] {
      --timeline-color: var(--color-infography);
    }

    &[data-category="style"] {
      --timeline-color: var(--color-style);
    }

    &[data-category="parenting"] {
      --timeline-color: var(--color-parenting);
    }

    &.left {
      right: 5%;
      align-self: flex-start;
      text-align: right;

      .timeline-branch {
        left: 50%;
        transform-origin: right center;
      }
    }

    &.right {
      left: 5%;
      align-self: flex-end;
      text-align: left;

      .timeline-branch {
        right: 50%;
        transform-origin: left center;
      }
    }

    &.visible .timeline-branch {
      transform: scaleX(1);
    }
  }

  .timeline-branch {
    position: absolute;
    top: var(--space-4);
    z-index: 1;
    width: 60%;
    height: 4px;
    background: currentColor;
    opacity: 0.3;
    transform: scaleX(0);
    transition: transform 500ms var(--ease-out);
    pointer-events: none;
  }

  .timeline-dot {
    position: absolute;
    top: var(--space-3);
    left: 50%;
    z-index: 3;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    background: currentColor;
    pointer-events: none;
  }

  .timeline-card {
    position: relative;
    margin: var(--space-4) 0;
    padding: var(--space-4);
    border: var(--border-1);
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
    overflow-wrap: anywhere;
    font-size: var(--text-base);
    line-height: var(--lh-titles);
    color: currentColor;
  }

  .timeline-card p {
    margin-top: var(--space-3);
    overflow-wrap: anywhere;
    font-size: var(--text-sm);
    line-height: var(--lh-base);
    color: var(--color-muted);
  }

  .timeline-skip-btn {
    position: fixed;
    bottom: var(--space-12);
    left: 50%;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border: var(--border-1);
    border-radius: var(--radius-full);
    background: var(--color-white);
    color: var(--color-text);
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    touch-action: manipulation;
    transform: translateX(-50%);
    transition:
      opacity 400ms var(--ease-out),
      transform 400ms var(--ease-out),
      background-color 200ms ease;

    svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      animation: pulse-arrow 2s infinite ease-in-out;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 4px;
    }

    &.hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateX(-50%) translateY(20px);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .timeline-skip-btn:hover {
      background: var(--color-muted-background, #f3f4f6);
    }
  }

  @keyframes pulse-arrow {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(3px);
    }
  }

  @media (max-width: 768px) {
    .timeline {
      gap: var(--space-6);
      padding-inline: var(--space-4);
    }

    .timeline-item {
      width: 100%;
      align-self: center;
      text-align: center;
      transform: translateY(24px);

      &.left,
      &.right {
        left: auto;
        right: auto;
      }

      &.visible {
        transform: translateY(0);
      }
    }

    .timeline-branch {
      display: none;
    }

    .timeline-dot {
      left: 50%;
      transform: translateX(-50%);
    }

    .timeline-card {
      max-width: 100%;
      margin-inline: auto;
      text-align: left;
    }

    .timeline-line,
    .timeline-progress {
      z-index: 0;
    }

    .timeline-skip-btn {
      bottom: var(--space-4);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .timeline-progress,
    .timeline-item,
    .timeline-branch,
    .timeline-card,
    .timeline-skip-btn {
      transition-duration: 0.01ms;
      transition-delay: 0ms;
    }

    .timeline-skip-btn svg {
      animation: none;
    }
  }
</style>
