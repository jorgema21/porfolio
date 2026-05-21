<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";
  import { languages, type LanguageId } from "$lib/data/about/languages.data";

  const MAX_LEVEL = 10;

  let selected = $state<LanguageId[]>(
    languages.filter((l) => l.defaultSelected).map((l) => l.id),
  );

  const toggleLanguage = (id: LanguageId) => {
    selected = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
  };

  const selectedSet = $derived(new Set(selected));

  const activeLanguages = $derived(
    languages.filter((l) => selectedSet.has(l.id)),
  );

  const dict = $derived(t.languages);

  const circles = $derived(
    Array.from({ length: MAX_LEVEL }, (_, i) => {
      const level = i + 1;
      const topLanguage = activeLanguages.findLast((l) => l.level >= level);
      const isExactMatch = activeLanguages.some((l) => l.level === level);

      return {
        level,
        color: topLanguage?.color ?? "var(--color-border)",
        showLabel: isExactMatch && topLanguage,
        langId: topLanguage?.id,
      };
    }),
  );

  let languagesSection = $state<HTMLElement | null>(null);
  let visible = $state(false);

  $effect(() => {
    if (!languagesSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(languagesSection);

    return () => observer.disconnect();
  });
</script>

<section
  class="languages"
  aria-labelledby="languages-title"
  bind:this={languagesSection}
>
  <div class="languages-selector" role="group">
    {#each languages as language, i (language.id)}
      <button
        type="button"
        class="language-toggle"
        class:selected={selectedSet.has(language.id)}
        class:visible
        style={`--i:${i}`}
        aria-pressed={selectedSet.has(language.id)}
        onclick={() => toggleLanguage(language.id)}
      >
        {dict[language.id].name}
      </button>
    {/each}
  </div>

  <div class="languages-chart">
    <div class="languages-scale">
      <span class="scale-label">{dict.scale.beginner}</span>

      <div class="languages-circles" aria-hidden="true">
        {#each circles as circle, i (circle.level)}
          <span
            class="language-circle"
            class:visible
            style={`background:${circle.color}; --i:${i + 5}`}
          >
            {#if circle.showLabel && circle.langId}
              <span
                class="language-label"
                class:visible
                style={`--language-color:${circle.color}; --i:${circle.level + 10}`}
              >
                <strong>{dict[circle.langId].name}</strong>
                <small>{dict[circle.langId].levelLabel}</small>
              </span>
            {/if}
          </span>
        {/each}
      </div>

      <span class="scale-label">{dict.scale.professional}</span>
    </div>
  </div>
</section>

<style>
  .languages {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .languages-chart {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding-top: var(--space-12);
  }

  .languages-scale {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-4);
  }

  .languages-circles {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 0.2rem;
  }

  .scale-label {
    font-size: var(--text-sm);
    color: var(--color-muted);
  }

  .language-circle {
    position: relative;
    width: 100%;
    max-width: 20px;
    margin-inline: auto;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--color-border);
    transform: translateY(12px) scale(0.92);
    transition:
      background var(--transition),
      transform var(--transition-fast);

    &.visible {
      transform: translateY(0) scale(1);
    }
  }

  .language-label {
    position: absolute;
    bottom: calc(100% - 0.3rem);
    left: 185%;
    transform-origin: bottom left;
    display: flex;
    flex-direction: column;
    color: var(--language-color);
    pointer-events: none;
    white-space: nowrap;
    line-height: var(--lh-solid);
    gap: var(--space-1);

    transform: translateY(12px) translateX(-10%)
      rotate(var(--label-rotate, -45deg));

    &.visible {
      transform: translateY(0) translateX(-10%)
        rotate(var(--label-rotate, -45deg));
    }

    strong {
      font-size: var(--text-sm);
      font-weight: 700;
    }

    small {
      font-size: var(--text-xs);
      color: var(--color-muted);
      font-weight: 500;
    }
  }

  .languages-selector {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .language-toggle {
    padding: var(--space-3) var(--space-4);
    border: var(--border-1);
    border-radius: var(--radius-full);
    background: var(--color-white);
    color: var(--color-text);
    font-size: var(--text-sm);
    font-weight: 600;
    cursor: pointer;
    transition:
      border-color var(--transition),
      transform var(--transition-fast);

    &:hover {
      border-color: var(--blue-300);
    }

    &.selected {
      border-color: var(--blue-500);
      box-shadow: inset 0 0 0 1px
        color-mix(in srgb, var(--color-white) 20%, transparent);
    }
  }

  .language-toggle,
  .language-circle,
  .language-label {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity var(--lang-duration) var(--ease-out),
      transform var(--lang-duration) var(--ease-out);
    transition-delay: calc(var(--i) * var(--lang-stagger));

    &.visible {
      opacity: 1;
    }
  }

  .language-toggle.visible {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .languages {
      gap: var(--space-6);
    }

    .languages-selector {
      flex-wrap: wrap;
      overflow-x: auto;
      padding-bottom: var(--space-2);
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .language-toggle {
      flex: 0 0 auto;
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .languages-chart {
      padding-top: 2rem;
      gap: var(--space-4);
    }

    .languages-scale {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }

    .languages-circles {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
    }

    .language-circle {
      max-width: 16px;
      height: 16px;
      margin-inline: 0;
    }

    .language-label {
      bottom: auto;
      left: calc(100% + var(--space-3));
      top: 50%;
      --label-rotate: 0deg;
      flex-direction: row;
      align-items: center;
      gap: var(--space-2);
      transform: translateY(-50%) rotate(0deg) !important;

      &.visible {
        transform: translateY(-50%) rotate(0deg);
      }

      strong {
        font-size: var(--text-xs);
      }
    }
  }
</style>
