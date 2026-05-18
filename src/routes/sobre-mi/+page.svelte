<script lang="ts">
  import { t } from "$lib/i18n";
  import { skills } from "$lib/data/about/skills.data";
  import SkillBar from "$lib/components/about/SkillBar.svelte";
  import AboutTimeline from "$lib/components/about/AboutTimeline.svelte";
  import AboutLanguages from "$lib/components/about/AboutLanguages.svelte";
  import RichText from "$lib/components/writing/RichText.svelte";

  import { onMount } from "svelte";

  let skillsSection: HTMLElement | null = null;

  // 1. Estado reactivo simplificado: controla si la sección entera entró en pantalla
  let isSectionVisible = $state(false);

  onMount(() => {
    // 2. Eliminamos todo el evento scroll manual y la variable 'direction' ya que no se usaban.
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Controla de golpe si la sección es visible o no
        isSectionVisible = entry.isIntersecting;
      },
      {
        threshold: 0.2, // Umbral más bajo para que la animación empiece de forma fluida
        rootMargin: "0px 0px -10% 0px",
      },
    );

    if (skillsSection) observer.observe(skillsSection);

    return () => {
      observer.disconnect();
    };
  });
</script>

<main class="page">
  <!-- INTRO -->
  <!-- INTRO -->
  <h1>{$t.about.title}</h1>

  <p class="page-intro">
    <RichText value={$t.about.intro} />
  </p>

  <p class="page-intro">
    <RichText value={$t.about.focus} />
  </p>

  <!-- TIMELINE -->
  <section class="about-section">
    <h2>{$t.about.timelineTitle}</h2>

    <div class="timeline-legend cluster">
      <span class="legend-item study">{$t.about.study}</span>
      <span class="legend-item infography">{$t.about.infographics}</span>
      <span class="legend-item style">{$t.about.lifestyle}</span>
      <span class="legend-item motherhood">{$t.about.motherhood}</span>
    </div>

    <AboutTimeline />
  </section>

  <!-- SKILLS -->
  <section class="about-section" bind:this={skillsSection}>
    <h2>{$t.about.skillsTitle}</h2>

    {#each skills as skill, i (skill.id)}
      <!-- 3. CSS se encarga del Stagger (escalonado) de forma limpia usando la variable --i -->
      <div
        class="skill-wrapper"
        class:visible={isSectionVisible}
        style={`--i: ${i}`}
      >
        <SkillBar {skill} />
      </div>
    {/each}
  </section>

  <!-- LANGUAGES -->
  <section class="about-section">
    <h2>{$t.about.languagesTitle}</h2>

    <AboutLanguages />
  </section>

  <!-- CTA -->
  <section class="about-section about-cta">
    <div class="about-cta__content">
      <span class="about-cta__eyebrow">Open to work</span>

      <p class="about-cta__text">
        {$t.about.cta}
      </p>
    </div>

    <button class="button">
      {$t.about.downloadCV}
    </button>
  </section>
</main>
