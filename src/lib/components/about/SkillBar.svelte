<script lang="ts">
  import { base } from "$app/paths";
  import { slide } from "svelte/transition";
  import { t } from "$lib/i18n/index.svelte";
  import type { Skill, SkillId } from "$lib/data/about/skills.data";

  type SkillLevelKey =
    | "advanced"
    | "proficient"
    | "intermediate"
    | "learning"
    | "nextup";

  const {
  skill,
  index
} = $props<{
  skill: Skill;
  index: number;
}>();

  let open = $state(false);

  const content = $derived(t.skills[skill.id as SkillId]);
  const detailsId = $derived(`skill-details-${skill.id}`);
  const levelLabelId = $derived(`skill-level-${skill.id}`);

  const toggle = (): void => {
    open = !open;
  };

  const levelInfo = $derived.by(
    (): {
      key: SkillLevelKey;
      label: string;
    } => {
      const level = skill.level;

      if (level >= 9) {
        return {
          key: "advanced",
          label: t.skillLevels.advanced
        };
      }

      if (level >= 7) {
        return {
          key: "proficient",
          label: t.skillLevels.proficient
        };
      }

      if (level >= 5) {
        return {
          key: "intermediate",
          label: t.skillLevels.intermediate
        };
      }

      if (level >= 3) {
        return {
          key: "learning",
          label: t.skillLevels.learning
        };
      }

      return {
        key: "nextup",
        label: t.skillLevels.nextup
      };
    }
  );
</script>

<div class="skill" class:no-top-border={index === 0}>
  <button
    class="skill-header"
    type="button"
    onclick={toggle}
    aria-expanded={open}
    aria-controls={detailsId}
    aria-describedby={levelLabelId}
  >
    <div class="skill-main">
      {#if skill.logo}
        <img
          class="skill-logo"
          src={`${base}${skill.logo}`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      {/if}

      <div class="skill-info">
        <span class="skill-name">
          {content.name}
        </span>

        <span class="skill-description-mobile" aria-hidden="true">
          {content.description}
        </span>
      </div>
    </div>

    <div class="skill-badge-container">
      <span class="skill-badge {levelInfo.key}">
        {levelInfo.label}
      </span>
    </div>

    <div class="skill-bar" aria-hidden="true">
      {#each { length: 10 } as _, i (i)}
        <span
          class="segment"
          class:filled={i < skill.level}
        ></span>
      {/each}
    </div>

    <span id={levelLabelId} class="skill-level">
      <span class="sr-only">
        {levelInfo.label}:
      </span>

      {skill.level}/10
    </span>

    <span
      class="chevron"
      class:open
      aria-hidden="true"
    >
      +
    </span>
  </button>

  {#if open}
    <div
      id={detailsId}
      class="skill-details"
      transition:slide
    >
      <p class="skill-description">
        {content.description}
      </p>

      {#if content.details?.length}
        <ul class="skill-list">
          {#each content.details as item (item)}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>

<style>
.skill {
  position: relative;
  border-top: var(--border-1);
  transition:
    background var(--transition),
    border-color var(--transition);

  &.no-top-border {
    border-top: 0;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 2px;
    opacity: 0;
    transform: scaleY(0.4);
    transform-origin: center;
    pointer-events: none;
    transition:
      opacity 700ms var(--ease-out),
      transform 700ms var(--ease-out);
  }
}

  .skill-header {
    display: grid;
    grid-template-columns:
      minmax(0, 1fr)
      auto
      minmax(160px, min(24vw, 240px))
      auto
      auto;
    align-items: center;
    gap: var(--space-6);
    width: 100%;
    min-width: 0;
    padding: var(--space-6) 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 4px;
      border-radius: var(--radius-sm);
    }
  }

  .skill-main {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    min-width: 0;
  }

  .skill-logo {
    width: var(--space-8);
    height: var(--space-8);
    aspect-ratio: 1;
    object-fit: contain;
    flex-shrink: 0;
    filter: saturate(0.92);
    transition:
      transform var(--transition-slow),
      filter var(--transition),
      opacity var(--transition);
  }

  .skill-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .skill-name {
    overflow-wrap: anywhere;
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: 700;
    line-height: var(--lh-titles);
    letter-spacing: -0.02em;
    color: var(--color-text);
  }

  .skill-description-mobile {
    display: none;
    overflow-wrap: anywhere;
    font-size: var(--text-sm);
    line-height: var(--lh-base);
    color: var(--color-muted);
  }

  .skill-badge-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 0;
  }

  .skill-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-sm);
    font-family: var(--font-sans);
    font-size: var(--text-2xs);
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    opacity: 0.75;

    &.advanced {
      background: var(--color-badge-advanced-bg);
      color: var(--color-badge-advanced-text);
    }

    &.proficient {
      background: var(--color-badge-proficient-bg);
      color: var(--color-badge-proficient-text);
    }

    &.intermediate {
      background: var(--color-badge-intermediate-bg);
      color: var(--color-badge-intermediate-text);
    }

    &.learning {
      background: var(--color-badge-learning-bg);
      color: var(--color-badge-learning-text);
    }

    &.nextup {
      background: var(--color-badge-nextup-bg);
      color: var(--color-badge-nextup-text);
    }
  }

  .skill-bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    max-width: 360px;
    min-width: 0;
  }

  .segment {
    flex: 1;
    min-width: 0;
    height: var(--space-2);
    border-radius: var(--radius-full);
    background: var(--color-border);
    transform-origin: center;
    transition:
      transform var(--transition),
      background var(--transition);

    &.filled {
      background: var(--color-muted);
    }
  }

  .skill-level {
    font-size: var(--text-sm);
    letter-spacing: -0.03em;
    color: var(--color-muted);
    white-space: nowrap;
  }

  .chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--space-8);
    height: var(--space-8);
    margin-left: calc(var(--space-2) * -1);
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: 300;
    color: var(--color-muted);
    flex-shrink: 0;
    transition:
      transform var(--transition-slow),
      background var(--transition-fast),
      color var(--transition-fast);

    &.open {
      transform: rotate(45deg);
    }
  }

  .skill-details {
    max-width: 72ch;
    padding:
      0
      0
      var(--space-6)
      calc(var(--space-8) + var(--space-4));
    font-size: var(--text-sm);
  }

  .skill-description {
    margin: 0;
    overflow-wrap: anywhere;
    font-size: var(--text-sm);
    line-height: var(--lh-base);
    color: var(--color-muted);
  }

  .skill-list {
    display: grid;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding-left: var(--space-4);
    color: var(--color-muted);

    li {
      overflow-wrap: anywhere;
      line-height: var(--lh-base);

      &::marker {
        color: var(--bg-hard);
      }
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    .skill:is(:hover, :focus-within) {
      &::before {
        opacity: 1;
        transform: scaleY(1);
      }

      .skill-logo {
        transform: translateY(-1px) scale(1.035);
        filter: saturate(1);
      }

      .segment {
        transform: scaleY(1.1);
      }

      .chevron {
        background: rgb(0 0 0 / 4%);
        color: var(--color-text);
      }
    }
  }

  @media (max-width: 768px) {
    .skill-header {
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "main chevron"
        "badge level"
        "bar bar";
      gap: var(--space-2);
    }

    .skill-main {
      grid-area: main;
    }

    .chevron {
      grid-area: chevron;
      justify-self: end;
    }

    .skill-badge-container {
      grid-area: badge;
      justify-content: flex-start;
      min-width: 0;
      margin-top: var(--space-1);
    }

    .skill-bar {
      grid-area: bar;
      width: 100%;
      margin-top: var(--space-2);
    }

    .skill-level {
      grid-area: level;
      justify-self: end;
      min-width: 2.5rem;
      width: auto;
      margin-top: var(--space-1);
    }

    .skill-details {
      padding: 0 0 var(--space-6);
      margin-left: var(--space-4);
    }

    .skill-description-mobile {
      display: block;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skill,
    .skill::before,
    .skill-logo,
    .segment,
    .chevron {
      transition-duration: 0.01ms;
      transition-delay: 0ms;
    }
  }
</style>