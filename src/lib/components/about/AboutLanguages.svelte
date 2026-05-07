<!-- src/lib/components/about/AboutLanguages.svelte -->

<script lang="ts">
  import { t } from "$lib/i18n";

  import { languages, type LanguageId } from "$lib/data/languages.data";

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
</script>

<section class="languages" aria-labelledby="languages-title">
  <!-- SELECTORS -->

  <div class="languages-selector" role="group" aria-label="Language selectors">
    {#each languages as language (language.id)}
      <button
        type="button"
        class="language-toggle"
        class:selected={selected.includes(language.id)}
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
        {#each circles as circle (circle.level)}
          <span class="language-circle" style={`background:${circle.color}`}>
            {#each activeLanguages as language (language.id)}
              {#if language.level === circle.level}
                <span
                  class="language-label"
                  style={`--language-color:${language.color}`}
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
