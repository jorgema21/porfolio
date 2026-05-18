<script lang="ts">
  import { base } from "$app/paths";
  import { slide } from "svelte/transition";
  import { t } from "$lib/i18n";
  import type { Skill } from "$lib/data/about/skills.data";
  import type { SkillId } from "$lib/data/about/skills.data";

  // Desestructuración nativa de las Runas de Svelte 5
  const { skill } = $props<{ skill: Skill }>();

  let open = $state(false);
  const toggle = () => (open = !open);

  // 📦 Caché de traducción reactiva
  const content = $derived($t.skills[skill.id as SkillId]);
</script>

<div class="skill">
  <button class="skill-header ui-accordion-header" onclick={toggle}>
    <!-- LEFT -->
    <div class="skill-main">
      {#if skill.logo}
        <img
          class="skill-logo"
          src={`${base}${skill.logo}`}
          alt={`${content.name} logo`}
          loading="lazy"
        />
      {/if}

      <div class="skill-info">
        <span class="skill-name">{content.name}</span>
        <span class="skill-description-mobile">{content.description}</span>
      </div>
    </div>

    <!-- BAR -->
    <div class="skill-bar" aria-hidden="true">
      {#each { length: 10 } as _, i (i)}
        <span class="segment" class:filled={i < skill.level}></span>
      {/each}
    </div>

    <!-- LEVEL -->
    <span class="skill-level">{skill.level}/10</span>

    <!-- ICON -->
    <span class:open class="chevron" aria-hidden="true"> + </span>
  </button>

  {#if open}
    <div class="skill-details" transition:slide>
      <p class="skill-description">{content.description}</p>

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
    border-top: 1px solid var(--color-border);
    transition:
      background var(--transition),
      border-color var(--transition);
  }

  /* OPTIMIZACIÓN: Añadido color y grosor para que la línea lateral funcione */
  .skill::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 2px;
    background: var(--blue-500);
    opacity: 0;
    transform: scaleY(0.4);
    transition:
      opacity 700ms var(--ease-out),
      transform 700ms var(--ease-out);
  }

  .skill:hover::before {
    opacity: 1;
    transform: scaleY(1);
  }

  .skill-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(160px, 28vw) auto auto;
    align-items: center;
    gap: var(--space-6);
    width: 100%;
    padding: var(--space-6) 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
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
    object-fit: contain;
    flex-shrink: 0;
    filter: saturate(0.92);
    transition:
      transform var(--transition-slow),
      filter var(--transition),
      opacity var(--transition);
  }

  .skill:hover .skill-logo {
    transform: translateY(-1px) scale(1.035);
    filter: saturate(1);
  }

  .skill-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .skill-name {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--color-text);
  }

  .skill-description-mobile {
    display: none;
    font-size: var(--text-sm);
    line-height: 1.5;
    color: var(--color-muted);
  }

  .skill-bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .segment {
    flex: 1;
    height: var(--space-2);
    border-radius: var(--radius-full);
    background: var(--color-border);
    transition:
      transform var(--transition),
      background var(--transition);
  }

  .segment.filled {
    background: var(--blue-500);
  }

  .skill:hover .segment {
    transform: scaleY(1.4);
  }

  .skill-level {
    min-width: 3.2rem;
    font-size: var(--text-sm);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.03em;
    color: var(--color-muted);
    text-align: right;
  }

  .chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--space-8);
    height: var(--space-8);
    margin-left: calc(var(--space-2) * -1);
    border-radius: var(--radius-full);
    font-size: 1rem;
    font-weight: 300;
    color: var(--color-muted);
    transition:
      transform var(--transition-slow),
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .skill:hover .chevron {
    background: rgb(0 0 0 / 4%);
    color: var(--color-text);
  }

  .chevron.open {
    transform: rotate(45deg);
  }

  .skill-details {
    padding: 0 0 var(--space-6) calc(var(--space-8) + var(--space-4));
    max-width: 72ch;
  }

  .skill-description {
    margin: 0;
    font-size: var(--text-sm);
    line-height: 1.8;
    color: var(--color-muted);
  }

  .skill-list {
    display: grid;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding-left: var(--space-4);
    color: var(--color-muted);
  }

  .skill-list li {
    line-height: 1.65;
  }

  .skill-list li::marker {
    color: rgb(0 0 0 / 30%);
  }

  @media (max-width: 768px) {
    .skill-header {
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        "main chevron"
        "bar level";
      gap: var(--space-3);
    }
    .skill-main {
      grid-area: main;
    }
    .chevron {
      grid-area: chevron;
      justify-self: end;
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
    }
    .skill-details {
      padding: 0 0 var(--space-6);
    }
    .skill-description-mobile {
      display: block;
    }
  }
</style>
