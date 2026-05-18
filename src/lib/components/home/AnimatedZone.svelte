<script lang="ts">
  import { base } from "$app/paths";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { lang, t } from "$lib/i18n";
  import type { HomeProject, ProjectCategory } from "$lib/data/projects";

  const { items } = $props<{ items: HomeProject[] }>();

  let visibleCount = $state(0);
  const baseDelay = 120;

  $effect(() => {
    if (!items.length) return;
    visibleCount = 0;

    const interval = setInterval(() => {
      visibleCount += 1;
      if (visibleCount >= items.length) {
        clearInterval(interval);
      }
    }, baseDelay);

    return () => clearInterval(interval);
  });

  // Lógica de computación de propiedades (Antes en ProjectCard)
  const getProjectMeta = (project: HomeProject) => {
    const isInfographic = project.category === "infografia";
    const isExternal =
      project.category !== "infografia" && !!project.externalUrl;
    const href = isInfographic
      ? `${base}/infografias/${project.slug}`
      : project.externalUrl;
    const imageSrc = project.image?.startsWith("http")
      ? project.image
      : `${base}${project.image}`;

    return { isExternal, href, imageSrc, canNavigate: !!href };
  };
</script>

{#each items.slice(0, visibleCount) as project (project.id)}
  {@const meta = getProjectMeta(project)}

  <a
    class={`card ${project.variant}`}
    href={meta.href ?? undefined}
    target={meta.isExternal ? "_blank" : undefined}
    rel={meta.isExternal ? "noopener noreferrer" : undefined}
    aria-disabled={!meta.canNavigate}
    tabindex={meta.canNavigate ? 0 : -1}
    style={`
      --col-start: ${project.colStart};
      --col-span: ${project.colSpan};
      --row-start: ${project.rowStart};
      --row-span: ${project.rowSpan ?? 1};
    `}
    in:fly={{
      y: 34,
      duration: 2000,
      easing: cubicOut,
    }}
  >
    {#if project.image && project.variant !== "list"}
      <div class="thumb">
        <img src={meta.imageSrc} alt={project.title[$lang]} loading="lazy" />
      </div>
    {/if}

    <div class="content">
      <span class={`category ${project.category}`}>
        {$t.project.category[project.category as ProjectCategory]}
      </span>

      <h2 class="title">
        {project.title[$lang]}
      </h2>

      {#if project.description}
        <p class="description">
          {project.description[$lang]}
        </p>
      {/if}
    </div>
  </a>
{/each}

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    height: 100%;

    /* Variables de rejilla inyectadas directamente */
    grid-column-start: var(--col-start);
    grid-column-end: span var(--col-span);
    grid-row-start: var(--row-start);
    grid-row-end: span var(--row-span);

    will-change: transform, opacity; /* Optimización de hardware */
  }

  /* =========================
     FEATURE
     ========================= */
  .card.feature {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-8);
    align-items: start;
  }
  .card.feature .content {
    order: 1;
  }
  .card.feature .thumb {
    order: 2;
  }

  /* =========================
     LIST
     ========================= */
  .card.list {
    min-height: 100%;
  }

  /* =========================
     THUMB
     ========================= */
  .thumb {
    overflow: hidden;
    border-radius: var(--radius-lg);
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* =========================
     TYPOGRAPHY (BASE DESKTOP)
     ========================= */
  .title {
    margin-top: var(--space-2);
    margin-bottom: var(--space-2);
    max-width: 22ch;
    font: 500 var(--text-base) / 1.2 var(--font-serif);
    letter-spacing: -0.01em;
  }
  .description {
    margin-top: var(--space-2);
    max-width: 50ch;
    font: 350 var(--text-sm) var(--font-sans);
  }

  /* =========================
     CATEGORY
     ========================= */
  .category {
    font: 600 var(--text-xs) var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }
  .category.infografia {
    color: var(--blue-500);
  }
  .category.estilo_de_vida {
    color: var(--red-500);
  }
  .category.maternidad {
    color: var(--pink-500);
  }

  /* =========================
     VARIANTS (DESKTOP ONLY)
     ========================= */
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

  /* ==========================================================================
     RESPONSIVE SYSTEM (MOBILE FIRST RESET)
     ========================================================================== */
  /* ==========================================================================
     RESPONSIVE SYSTEM (MOBILE FIRST RESET)
     ========================================================================== */
  @media (max-width: 768px) {
    .card {
      gap: var(--space-3);


      grid-column-start: auto;
      grid-column-end: span 12;
      grid-row-start: auto;
      grid-row-end: auto;
    }

    .card.feature {
      grid-template-columns: 1fr;
    }
    .card.feature .content,
    .card.feature .thumb {
      order: initial;
    }
    .card .title {
      font-size: var(--text-lg) !important;
      max-width: 100%;
    }
    .card .description {
      font-size: var(--text-sm);
      max-width: 100%;
    }
    .card .category {
      font-size: var(--text-xs);
    }
  }
</style>
