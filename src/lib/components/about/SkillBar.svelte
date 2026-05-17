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
        <span class="skill-name">
          {content.name}
        </span>

        <span class="skill-description-mobile">
          {content.description}
        </span>
      </div>
    </div>

    <!-- BAR: Dibujamos directamente los 10 segmentos usando el índice del rango loops de Svelte 5 -->
    <div class="skill-bar" aria-hidden="true">
      {#each { length: 10 } as _, i (i)}
        <span class="segment" class:filled={i < skill.level}></span>
      {/each}
    </div>

    <!-- LEVEL -->
    <span class="skill-level">
      {skill.level}/10
    </span>

    <!-- ICON -->
    <span class:open class="chevron" aria-hidden="true"> + </span>
  </button>

  {#if open}
    <div class="skill-details" transition:slide>
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
