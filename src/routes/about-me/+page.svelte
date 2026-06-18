<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";
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

<div class="page">
  <h1>{t.about.title}</h1>

  <p class="page-intro"><RichText value={t.about.intro} /></p>
  <p class="page-intro"><RichText value={t.about.focus} /></p>

  <section class="about-section about-cta">
    <div class="about-cta__content">
      <span class="about-cta__eyebrow">Open to work</span>
      <p class="about-cta__text">{t.about.cta}</p>
    </div>
  </section>

  <section class="about-section">
    <h2>{t.about.timelineTitle}</h2>

    <p class="timeline-description">
      {t.about.timelineDesc}
    </p>

    <details class="mini-timeline-details">
      <summary class="mini-timeline-summary">
        <span class="summary-text">{t.about.miniTimelineTitle}</span>
        <svg
          class="summary-chevron"
          xmlns="http://w3.org"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div class="mini-timeline-content">
        <ul class="mini-timeline-list">
          {#each t.about.miniTimeline as event, i (i)}
            <li class="mini-timeline-item">{event}</li>
          {/each}
        </ul>
      </div>
    </details>

    <div class="timeline-legend cluster">
      <span class="legend-item study">{t.about.study}</span>
      <span class="legend-item infography">{t.about.infographics}</span>
      <span class="legend-item style">{t.about.lifestyle}</span>
      <span class="legend-item parenting">{t.about.parenting}</span>
    </div>

    <AboutTimeline />
  </section>

  <section class="about-section" bind:this={skillsSection}>
    <h2>{t.about.skillsTitle}</h2>

    {#each skills as skill, i (skill.id)}
      <div class="skill-wrapper" class:visible={isSectionVisible} style:--i={i}>
        <SkillBar {skill} />
      </div>
    {/each}
  </section>

  <section class="about-section">
    <h2>{t.about.languagesTitle}</h2>
    <AboutLanguages />
  </section>
</div>

<style>
  .timeline-description {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 500;
    line-height: var(--lh-base);
    letter-spacing: 0.02em;
    color: var(--color-muted);
    text-align: center;
  }

  h2 {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: var(--lh-titles, 1.15);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: var(--border-1);
  }

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
    margin-top: var(--space-4);
    margin-bottom: var(--space-10);
  }

  .mini-timeline-details {
    position: relative;
    max-width: 480px;
    margin: var(--space-4) auto var(--space-8) auto;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-white);
    transition: box-shadow var(--transition-fast);
  }

  .mini-timeline-details[open] {
    box-shadow: 0 4px 12px rgb(0 0 0 / 5%);
  }

  .mini-timeline-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
    list-style: none;
    cursor: pointer;
    user-select: none;
  }

  .mini-timeline-summary::-webkit-details-marker {
    display: none;
  }

  .summary-text {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text);
  }

  .summary-chevron {
    width: 14px;
    height: 14px;
    color: var(--color-muted);
    transition: transform var(--transition-fast);
  }

  .mini-timeline-details[open] .summary-chevron {
    transform: rotate(180deg);
  }

  .mini-timeline-content {
    position: absolute;
    top: 100%;
    left: -1px;
    right: -1px;
    z-index: 50;
    border: 1px solid var(--color-border);
    border-top: none;
    border-radius: var(--radius-md) var(--radius-md);
    padding: 0 var(--space-6) var(--space-6) var(--space-6);
    background: var(--color-minitimeline);
    box-shadow: 0 10px 25px rgb(0 0 0 / 10%);
  }

  .mini-timeline-list {
    position: relative;
    list-style: none;
    margin: var(--space-4) 0 0 0;
    padding: 0;
  }

  .mini-timeline-list::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 4px;
    bottom: 6px;
    width: 1px;
    background: var(--color-border);
    opacity: 0.7;
  }

  .mini-timeline-item {
    position: relative;
    padding-left: var(--space-6);
    margin-bottom: var(--space-5);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    line-height: var(--lh-base);
    color: var(--color-text);
    text-align: left;
  }

  .mini-timeline-item:last-child {
    margin-bottom: 0;
  }

  .mini-timeline-item::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 1px;
    width: 7px;
    height: 7px;
    border-radius: var(--radius-full);
    background: var(--color-border);
    border: 1px solid var(--color-white);
    z-index: 1;
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
      --timeline-color: var(--color-study);
    }
    &.infography {
      --timeline-color: var(--color-infography);
    }
    &.style {
      --timeline-color: var(--color-style);
    }
    &.parenting {
      --timeline-color: var(--color-parenting);
    }
  }

  .about-cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
    margin-top: var(--space-6);
    border-top: var(--border-1);
    padding-top: var(--space-6);
  }

  .about-cta__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    flex: 1;
  }

  .about-cta__eyebrow {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--blue-500);
  }

  .about-cta__text {
    font-size: var(--text-sm);
    font-weight: 700;
    line-height: var(--lh-base);
  }

  @media (max-width: 640px) {
    .about-cta {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);
    }
    .timeline-description {
      font-size: 11px;
      padding-inline: var(--space-2);
    }
  }
</style>
