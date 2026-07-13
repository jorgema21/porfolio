<script lang="ts">
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { langSignal, t } from "$lib/i18n/index.svelte";
  import type { HomeProject, ProjectCategory } from "$lib/data/projects";

  const { items } = $props<{ items: HomeProject[] }>();

  let visibleCount = $state(2);
  const baseDelay = 50;

  $effect(() => {
    if (!items.length) return;

    if (items.length <= 2) {
      visibleCount = items.length;
      return;
    }

    const interval = setInterval(() => {
      visibleCount += 1;
      if (visibleCount >= items.length) {
        clearInterval(interval);
      }
    }, baseDelay);

    return () => clearInterval(interval);
  });

  const getProjectMeta = (project: HomeProject) => {
    const isInfographic = project.category === "infografia";
    const href = isInfographic
      ? `${base}/graphics/${project.slug}`
      : project.externalUrl;
    const imageSrc = project.image?.startsWith("http")
      ? project.image
      : `${base}${project.image}`;

    return {
      isExternal: project.category !== "infografia" && !!project.externalUrl,
      href,
      imageSrc,
      canNavigate: !!href,
    };
  };
</script>

{#each items as project, i (project.id)}
  {@const meta = getProjectMeta(project)}
  {@const isCritical = i < 2}

  {#if isCritical || i < visibleCount}
    <a
      class="card {project.variant}"
      href={meta.href ?? undefined}
      target={meta.isExternal ? "_blank" : undefined}
      rel={meta.isExternal ? "noopener noreferrer" : undefined}
      aria-disabled={!meta.canNavigate}
      tabindex={meta.canNavigate ? 0 : -1}
      style:--col-start={project.colStart}
      style:--col-span={project.colSpan}
      style:--row-start={project.rowStart}
      style:--row-span={project.rowSpan ?? 1}
      in:fly={!isCritical
        ? { y: 20, duration: 400, easing: cubicOut }
        : undefined}
    >
      {#if project.image && project.variant !== "list"}
        <div class="thumb">
          <img
            src={meta.imageSrc}
            alt={project.title[langSignal.current]}
            width="800"
            height="450"
            decoding={isCritical ? "sync" : "async"}
            loading={isCritical ? "eager" : "lazy"}
            fetchpriority={isCritical ? "high" : "low"}
          />
        </div>
      {/if}

      <div class="content">
        <span class="category {project.category}">
          {t.project.category[project.category as ProjectCategory]}
        </span>

        <h2 class="title">
          {project.title[langSignal.current]}
        </h2>

        {#if project.description}
          <p class="description">
            {project.description[langSignal.current]}
          </p>
        {/if}
      </div>
    </a>
  {/if}
{/each}

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    height: 100%;
    background: var(--color-white);
    text-align: left;
    text-decoration: none;
    color: inherit;
    cursor: pointer;

    grid-column-start: var(--col-start);
    grid-column-end: span var(--col-span);
    grid-row-start: var(--row-start);
    grid-row-end: span var(--row-span);

    border-bottom: var(--border-1);

    will-change: transform, opacity;
    transition:
      transform var(--transition),
      box-shadow var(--transition),
      opacity var(--transition);

    &:hover {
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &[aria-disabled="true"] {
      opacity: 0.6;
      cursor: default;
    }
  }
  .card:nth-last-child(3) {
    border-bottom: none;
    padding-bottom: 0;
  }

  .thumb {
    overflow: hidden;
    border-radius: var(--radius-lg);
    aspect-ratio: 16/9;

    img {
      width: 100%;
      height: auto;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
      transition: transform var(--transition);
    }
  }

  .card:hover .thumb img {
    transform: scale(1.03);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .card.hero {
    justify-content: flex-start;
  }

  .card.feature {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-8);
    align-items: start;
    padding-bottom: var(--space-4);

    .content {
      order: 1;
    }
    .thumb {
      order: 2;
    }
  }

  .card.grid {
    padding-bottom: var(--space-6);
  }

  .card.list {
    min-height: 100%;
    flex-direction: row;
    padding-bottom: var(--space-6);

    .thumb {
      width: 180px;
      flex-shrink: 0;
    }
  }

  .title {
    margin: 0;
    font: 500 var(--text-base) / 1.2 var(--font-serif);
    letter-spacing: -0.01em;
  }

  .card.hero .title {
    font-size: var(--text-2xl);
  }
  .card.feature .title {
    font-size: var(--text-xl);
  }
  .card.grid .title,
  .card.list .title {
    font-size: var(--text-lg);
  }

  .description {
    margin: 0;
    max-width: 50ch;
    font: 350 var(--text-sm) var(--font-sans);
    color: var(--color-muted, inherit);
  }

  .category {
    font: 600 var(--text-xs) var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.1em;

    &.infografia {
      color: var(--color-infography);
    }
    &.estilo_de_vida {
      color: var(--color-style);
    }
    &.maternidad {
      color: var(--color-parenting);
    }
  }

  @media (max-width: 768px) {
    .card {
      gap: var(--space-3);
      grid-column-start: auto;
      grid-column-end: span 12;
      grid-row-start: auto;
      grid-row-end: auto;
      display: flex;
      flex-direction: column;
      border-bottom: var(--border-1);
      padding-bottom: var(--space-6);
    }

    .card:nth-last-child(4),
    .card:nth-last-child(5) {
      border-bottom: var(--border-1);
      padding-bottom: var(--space-6);
    }

    .card:has(.category.infografia) {
      order: 1;
    }

    .card:has(.category.estilo_de_vida) {
      order: 2;
    }

    .card:has(.category.maternidad) {
      order: 3;
    }

    .card.feature {
      grid-template-columns: 1fr;
      padding-bottom: var(--space-6);

      .content,
      .thumb {
        order: initial;
      }
    }

    .card.list {
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: var(--space-6);

      .thumb {
        width: 100%;
      }
    }

    .card .title {
      font-size: var(--text-lg) !important;
      max-width: 100%;
    }

    .card .description {
      font-size: var(--text-sm);
      max-width: 100%;
    }
  }
</style>
