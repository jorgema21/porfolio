<script lang="ts">
  import { t } from "$lib/i18n";

  import { skills } from "$lib/data/skills.data";

  import AboutTimeline from "$lib/components/about/AboutTimeline.svelte";
  import SkillBar from "$lib/components/about/SkillBar.svelte";
  import AboutLanguages from "$lib/components/about/AboutLanguages.svelte";
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
  <section class="about-section">
    <h2>{$t.about.skillsTitle}</h2>

    {#each skills as skill (skill.id)}
      <SkillBar {skill} />
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