<script lang="ts">
  import { t } from "$lib/i18n";
  import { skills } from "$lib/data/skills.data";
  import SkillBar from "$lib/components/about/SkillBar.svelte";
  import AboutTimeline from "$lib/components/about/AboutTimeline.svelte";
  import AboutLanguages from "$lib/components/about/AboutLanguages.svelte";

  import { onMount } from "svelte";

  let skillsSection: HTMLElement;

  let visible = $state(false);
  let activeIndex = $state(-1);

  let lastScrollY = 0;
  let direction: "down" | "up" = "down";

  function startStaggerWave() {
    const baseDelay = 90;

    skills.forEach((_, i) => {
      const waveFactor = Math.pow(i, 1.25);
      const delay = waveFactor * baseDelay;

      setTimeout(() => {
        activeIndex = i;
      }, delay);
    });
  }

  function reverseStaggerWave() {
    const baseDelay = 70;

    [...skills].reverse().forEach((_, index) => {
      const i = skills.length - 1 - index;

      const waveFactor = Math.pow(index, 1.2);
      const delay = waveFactor * baseDelay;

      setTimeout(() => {
        activeIndex = i - 1;
      }, delay);
    });
  }

  onMount(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      direction = currentY > lastScrollY ? "down" : "up";
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          startStaggerWave();
        } else {
          reverseStaggerWave();
        }
      },
      {
        threshold: 0.6,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (skillsSection) observer.observe(skillsSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
</script>

<main class="page about">
  <!-- INTRO -->
  <h1>{$t.about.title}</h1>

  <section class="about-intro">
    <div class="about-intro__content">
      <p>{$t.about.intro}</p>
      <p>{$t.about.focus}</p>
    </div>

    <div class="about-intro__media">
      <div class="placeholder"></div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section class="about-section">
    <h2>{$t.about.timelineTitle}</h2>

    <div class="timeline-legend cluster">
      <span class="legend-item study">{$t.about.study}</span>
      <span class="legend-item infography">{$t.about.infographics}</span>
      <span class="legend-item style">{$t.about.lifestyle}</span>
    </div>

    <AboutTimeline />
  </section>

  <!-- SKILLS -->
  <section class="about-section" bind:this={skillsSection}>
    <h2>{$t.about.skillsTitle}</h2>

    {#each skills as skill, i (skill.id)}
      <div
        class="skill-wrapper"
        class:visible={i <= activeIndex}
        style={`--i:${i}`}
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
    <p>{$t.about.cta}</p>

    <button>
      {$t.about.downloadCV}
    </button>
  </section>
</main>