<script lang="ts">
  import { t } from "$lib/i18n";
  import { skills } from "$lib/data/about/skills.data";
  import SkillBar from "$lib/components/about/SkillBar.svelte";
  import AboutTimeline from "$lib/components/about/AboutTimeline.svelte";
  import AboutLanguages from "$lib/components/about/AboutLanguages.svelte";
  import RichText from "$lib/components/writing/RichText.svelte";

  let skillsSection: HTMLElement | null = null;
  let isSectionVisible = $state(false);

  $effect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    if (skillsSection) observer.observe(skillsSection);

    return () => {
      observer.disconnect();
    };
  });
</script>

<main class="page">
  <h1>{$t.about.title}</h1>

  <p class="page-intro"><RichText value={$t.about.intro} /></p>
  <p class="page-intro"><RichText value={$t.about.focus} /></p>

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

  <section class="about-section" bind:this={skillsSection}>
    <h2>{$t.about.skillsTitle}</h2>

    {#each skills as skill, i (skill.id)}
      <div class="skill-wrapper" class:visible={isSectionVisible} style:--i={i}>
        <SkillBar {skill} />
      </div>
    {/each}
  </section>

  <section class="about-section">
    <h2>{$t.about.languagesTitle}</h2>
    <AboutLanguages />
  </section>

  <section class="about-section about-cta">
    <div class="about-cta__content">
      <span class="about-cta__eyebrow">Open to work</span>
      <p class="about-cta__text">{$t.about.cta}</p>
    </div>

    <button class="button">{$t.about.downloadCV}</button>
  </section>
</main>

<style>
  .skill-wrapper {
    opacity: 0;
    transform: translateY(var(--space-4));
    transition:
      opacity 800ms var(--ease-out),
      transform 800ms var(--ease-out);
  }

  .skill-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .timeline-legend {
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-10);
  }

  .legend-item {
    --timeline-color: var(--color-text);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--timeline-color);

    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: var(--radius-full);
      background: currentColor;
    }

    &.study {
      --timeline-color: var(--timeline-study);
    }
    &.infography {
      --timeline-color: var(--timeline-infography);
    }
    &.style {
      --timeline-color: var(--timeline-style);
    }
    &.motherhood {
      --timeline-color: var(--timeline-motherhood);
    }
  }

  .about-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--cta-gap);
    margin-top: var(--space-12);
    border-top: 1px solid var(--color-border);
    padding-top: var(--space-6);
  }

  .about-cta__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .about-cta__eyebrow {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--blue-500);
  }

  .about-cta__text {
    max-width: 20ch;
    font-size: var(--text-lg);
    font-weight: 600;
    line-height: 1.2;
  }
</style>
