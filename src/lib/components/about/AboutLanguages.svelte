<!-- src/lib/components/about/AboutLanguages.svelte -->

<script lang="ts">
  import { t } from "$lib/i18n";

  import { languages, type LanguageId } from "$lib/data/languages.data";

  import { onMount } from "svelte";

  const MAX_LEVEL = 10;

  let selected = $state<LanguageId[]>(
    languages
      .filter((language) => language.defaultSelected)
      .map((language) => language.id),
  );

  const toggleLanguage = (id: LanguageId) => {
    if (selected.includes(id)) {
      selected = selected.filter((languageId) => languageId !== id);

      return;
    }

    selected = [...selected, id];
  };

  const activeLanguages = $derived(
    languages.filter((language) => selected.includes(language.id)),
  );

  const circles = $derived(
    Array.from({ length: MAX_LEVEL }, (_, index) => {
      const level = index + 1;

      const activeAtLevel = activeLanguages.filter(
        (language) => language.level >= level,
      );

      const topLanguage = activeAtLevel.at(-1);

      return {
        level,

        color: topLanguage?.color ?? "var(--color-border)",
      };
    }),
  );

  const dict = $derived($t.languages);

  let languagesSection: HTMLElement;

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    if (languagesSection) {
      observer.observe(languagesSection);
    }

    return () => observer.disconnect();
  });
</script>

<section
  class="languages"
  aria-labelledby="languages-title"
  bind:this={languagesSection}
>
  <!-- SELECTORS -->

  <div class="languages-selector" role="group" aria-label="Language selectors">
    {#each languages as language, i (language.id)}
      <button
        type="button"
        class="language-toggle"
        class:selected={selected.includes(language.id)}
        class:visible={visible}
        style={`--i:${i}`}
        aria-pressed={selected.includes(language.id)}
        onclick={() => toggleLanguage(language.id)}
      >
        {dict[language.id].name}
      </button>
    {/each}
  </div>

  <!-- CHART -->

  <div class="languages-chart">
    <!-- SCALE -->

    <div class="languages-scale" aria-label="Language proficiency scale">
      <span class="scale-label">
        {dict.scale.beginner}
      </span>

      <div class="languages-circles" aria-hidden="true">
        {#each circles as circle, i (circle.level)}
          <span
            class="language-circle"
            class:visible={visible}
            style={`background:${circle.color}; --i:${i + 5}`}
          >
            {#each activeLanguages as language (language.id)}
              {#if language.level === circle.level}
                <span
                  class="language-label"
                  class:visible={visible}
                  style={`--language-color:${language.color}; --i:${circle.level + 10}`}
                >
                  <strong>
                    {dict[language.id].name}
                  </strong>

                  <small>
                    {dict[language.id].levelLabel}
                  </small>
                </span>
              {/if}
            {/each}
          </span>
        {/each}
      </div>

      <span class="scale-label">
        {dict.scale.professional}
      </span>
    </div>
  </div>
</section>