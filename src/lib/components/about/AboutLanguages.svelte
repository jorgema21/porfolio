<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";
  import { languages, type LanguageId } from "$lib/data/about/languages.data";

  const MAX_LEVEL = 10;

  let selected = $state<LanguageId[]>(
    languages
      .filter((language) => language.defaultSelected)
      .map((language) => language.id),
  );

  let languagesSection = $state<HTMLElement | null>(null);
  let visible = $state(false);

  const selectedSet = $derived(new Set(selected));

  const activeLanguages = $derived(
    languages.filter((language) => selectedSet.has(language.id)),
  );

  const dict = $derived(t.languages);

  const circles = $derived.by(() =>
    Array.from({ length: MAX_LEVEL }, (_, index) => {
      const level = index + 1;

      const topLanguage = activeLanguages.findLast(
        (language) => language.level >= level,
      );

      const exactLanguage = activeLanguages.findLast(
        (language) => language.level === level,
      );

      return {
        level,
        color: topLanguage?.color ?? "var(--color-border)",
        langId: exactLanguage?.id,
      };
    }),
  );

  const toggleLanguage = (id: LanguageId): void => {
    selected = selectedSet.has(id)
      ? selected.filter((selectedId) => selectedId !== id)
      : [...selected, id];
  };

  $effect(() => {
    const section = languagesSection;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  });
</script>

<section
  class="languages"
  aria-label={t.about.languagesTitle}
  bind:this={languagesSection}
>
  <div
    class="languages-selector"
    role="group"
    aria-label={t.about.aria.languagesSelector}
  >
    {#each languages as language, index (language.id)}
      <button
        type="button"
        class="language-toggle"
        class:selected={selectedSet.has(language.id)}
        class:visible
        style:--i={index}
        aria-pressed={selectedSet.has(language.id)}
        onclick={() => toggleLanguage(language.id)}
      >
        {dict[language.id].name}
      </button>
    {/each}
  </div>

  <div class="languages-chart">
    <div class="languages-scale">
      <span class="scale-label">
        {dict.scale.beginner}
      </span>

      <div class="languages-circles" aria-hidden="true">
        {#each circles as circle, index (circle.level)}
          <span
            class="language-circle"
            class:visible
            style:background={circle.color}
            style:--i={index + 5}
          >
            {#if circle.langId}
              <span
                class="language-label"
                class:visible
                style:--language-color={circle.color}
                style:--i={circle.level + 10}
              >
                <strong>
                  {dict[circle.langId].name}
                </strong>

                <small>
                  {dict[circle.langId].levelLabel}
                </small>
              </span>
            {/if}
          </span>
        {/each}
      </div>

      <span class="scale-label">
        {dict.scale.professional}
      </span>
    </div>
  </div>
</section>

<style>
  .languages {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
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
    font: inherit;
    font-size: var(--text-sm);
    font-weight: 700;
    cursor: pointer;
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity var(--lang-duration) var(--ease-out),
      transform var(--lang-duration) var(--ease-out),
      border-color var(--transition),
      box-shadow var(--transition);
    transition-delay: calc(var(--i) * var(--lang-stagger));

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    &.selected {
      border-color: var(--blue-500);
      box-shadow: inset 0 0 0 1px
        color-mix(in srgb, var(--color-white) 20%, transparent);
    }

    &:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 3px;
    }
  }

  .languages-chart {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding-top: var(--space-12);
  }

  .languages-scale {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-4);
  }

  .scale-label {
    font-size: var(--text-sm);
    color: var(--color-muted);
    white-space: nowrap;
  }

  .languages-circles {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 0.2rem;
  }

  .language-circle {
    position: relative;
    width: 100%;
    max-width: 20px;
    margin-inline: auto;
    aspect-ratio: 1;
    border-radius: var(--radius-full);
    background: var(--color-border);
    opacity: 0;
    transform: translateY(12px) scale(0.92);
    transition:
      opacity var(--lang-duration) var(--ease-out),
      transform var(--lang-duration) var(--ease-out),
      background var(--transition);

    &.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .language-label {
    position: absolute;
    bottom: calc(100% - 0.3rem);
    left: 185%;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    color: var(--language-color);
    line-height: var(--lh-solid);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transform-origin: bottom left;
    transform: translateY(12px) translateX(-10%) rotate(-45deg);
    transition:
      opacity var(--lang-duration) var(--ease-out),
      transform var(--lang-duration) var(--ease-out);
    transition-delay: calc(var(--i) * var(--lang-stagger));

    &.visible {
      opacity: 1;
      transform: translateY(0) translateX(-10%) rotate(-45deg);
    }

    strong {
      font-size: var(--text-sm);
      font-weight: 700;
    }

    small {
      font-size: var(--text-xs);
      font-weight: 400;
      color: var(--color-muted);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .language-toggle:hover {
      border-color: var(--blue-300);
    }

    .language-toggle.selected:hover {
      border-color: var(--blue-500);
    }
  }

  @media (max-width: 768px) {
    .languages {
      gap: var(--space-6);
    }

    .languages-selector {
      padding-bottom: var(--space-2);
    }

    .language-toggle {
      flex: 0 0 auto;
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-xs);
    }

    .languages-chart {
      gap: var(--space-4);
      padding-top: 2rem;
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
      width: 16px;
      height: 16px;
      max-width: none;
      margin-inline: 0;
    }

    .language-label {
      top: 50%;
      bottom: auto;
      left: calc(100% + var(--space-3));
      flex-direction: row;
      align-items: center;
      gap: var(--space-2);
      transform-origin: left center;
      transform: translateY(calc(-50% + 12px)) rotate(0deg);

      &.visible {
        transform: translateY(-50%) rotate(0deg);
      }

      strong {
        font-size: var(--text-xs);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .language-toggle,
    .language-circle,
    .language-label {
      transition-duration: 0.01ms;
      transition-delay: 0ms;
    }
  }
</style>
