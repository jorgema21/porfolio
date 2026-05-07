<script lang="ts">
  import { slide } from "svelte/transition";
  import { t } from "$lib/i18n";
  import type { Skill, SkillId } from "$lib/data/skills.data";

  const { skill } = $props<{ skill: Skill }>();

  let open = $state(false);

  const segments = 10;

  const toggle = () => {
    open = !open;
  };

  const filledSegments = $derived(
    Array.from({ length: segments }, (_, i) => i < skill.level),
  );

  const content = $derived(() => {
    const dict = $t.skills;
    return dict[skill.id as SkillId];
  });
</script>

<div class="skill">
  <button
    type="button"
    class="skill-header ui-accordion-header"
    aria-expanded={open}
    aria-controls={"skill-" + skill.id}
    onclick={toggle}
  >
    <!-- LEFT -->
    <div class="skill-main">
      {#if skill.logo}
        <img
          class="skill-logo"
          src={skill.logo}
          alt={`${content().name} logo`}
          loading="lazy"
        />
      {/if}

      <div class="skill-info">
        <span class="skill-name">
          {content().name}
        </span>

        <span class="skill-description-mobile">
          {content().description}
        </span>
      </div>
    </div>

    <!-- BAR -->
    <div class="skill-bar" aria-hidden="true">
      {#each filledSegments as isFilled}
        <span class="segment" class:filled={isFilled}></span>
      {/each}
    </div>

    <!-- LEVEL -->
    <span class="skill-level">
      {skill.level}/10
    </span>

    <!-- ICON -->
    <span class:open class="chevron" aria-hidden="true">+</span>
  </button>

  {#if open}
    <div
      id={"skill-" + skill.id}
      class="skill-details"
      transition:slide
      role="region"
    >
      <p class="skill-description">
        {content().description}
      </p>

      {#if content().details?.length}
        <ul class="skill-list">
          {#each content().details as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>