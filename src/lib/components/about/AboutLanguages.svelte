<script lang="ts">
  import { t } from "$lib/i18n";
  import { languages, type LanguageId } from "$lib/data/about/languages.data";
  import { onMount } from "svelte";

  const MAX_LEVEL = 10;

  let selected = $state<LanguageId[]>(
    languages.filter((l) => l.defaultSelected).map((l) => l.id),
  );

  const toggleLanguage = (id: LanguageId) => {
    selected = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
  };

  // ⚡ lookup optimizado
  const selectedSet = $derived(new Set(selected));

  // 📦 idiomas activos
  const activeLanguages = $derived(
    languages.filter((l) => selectedSet.has(l.id)),
  );

  // 🌍 traducciones (sin wrapper extra)
  const dict = $t.languages;

  // 📊 círculos completamente declarativos
  const circles = $derived(
    Array.from({ length: MAX_LEVEL }, (_, i) => {
      const level = i + 1;

      const topLanguage = activeLanguages.findLast((l) => l.level >= level);

      return {
        level,
        color: topLanguage?.color ?? "var(--color-border)",
      };
    }),
  );

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

    if (languagesSection) observer.observe(languagesSection);

    return () => observer.disconnect();
  });
</script>

<section
  class="languages"
  aria-labelledby="languages-title"
  bind:this={languagesSection}
>
  <!-- =========================
       SELECTORS
  ========================== -->
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

  <!-- =========================
       CHART
  ========================== -->
  <div class="languages-chart">
    <div class="languages-scale">
      <span class="scale-label">
        {dict.scale.beginner}
      </span>

      <div class="languages-circles" aria-hidden="true">
        {#each circles as circle, i (circle.level)}
          <span
            class="language-circle"
            class:visible
            style={`background:${circle.color}; --i:${i + 5}`}
          >
            {#each activeLanguages as language (language.id)}
              {#if language.level === circle.level}
                <span
                  class="language-label"
                  class:visible
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
