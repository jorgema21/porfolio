<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/data/projects";

  const { project, variant } = $props<{
    project: Project;
    variant: "hero" | "grid" | "list" | "feature";
  }>();

  const clickable = $derived(
    project.category === "infografia" || !!project.externalUrl,
  );

  const href = $derived(
    project.category === "infografia"
      ? `/infografias/${project.slug}`
      : project.externalUrl,
  );

  const isExternal = $derived(
    project.category === "estilo" && !!project.externalUrl,
  );

  const handleClick = (e: MouseEvent) => {
    if (!clickable) {
      e.preventDefault();
      return;
    }

    // navegación interna con SvelteKit
    if (!isExternal) {
      e.preventDefault();
      goto(href);
    }
  };
</script>

<a
  class={`card ${variant}`}
  href={clickable ? href : undefined}
  aria-disabled={!clickable}
  tabindex={clickable ? 0 : -1}
  onclick={handleClick}
  target={isExternal ? "_blank" : undefined}
  rel={isExternal ? "noopener noreferrer" : undefined}
>
  {#if project.image && variant !== "list"}
    <div class="thumb">
      <img src={project.image} alt={project.title.es} loading="lazy" />
    </div>
  {/if}

  <div class="content">
    {#if project.category}
      <span class={`category ${project.category}`}>
        {project.category}
      </span>
    {/if}

    <h2 class="title">{project.title.es}</h2>

    {#if project.description}
      <p class="description">{project.description.es}</p>
    {/if}
  </div>
</a>

<style>
  /* reset */
  a {
    color: var(--font-sans);
    text-decoration: none;
  }
  .card {
    background: var(--color-white);
    border: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;

    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .card:hover {
    transform: translateY(-2px);
  }

  .card[aria-disabled="true"] {
    cursor: default;
    opacity: 0.6;
  }

  .card:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 3px;
  }

  /* media */
  .thumb {
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: 2px;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: transform 0.4s ease;
    will-change: transform;
  }

  .card:hover .thumb img {
    transform: scale(1.03);
  }

  /* content */
  .content {
    display: flex;
    flex-direction: column;
  }

  .title {
    font: 500 1rem/1.2 var(--font-serif);
    letter-spacing: -0.01em;
    max-width: 22ch;
  }

  .description {
    font: 350 0.95rem var(--font-sans);
    max-width: 50ch;
  }

  .category {
    font: 600 0.7rem var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }

  .category.infografia { color: var(--blue-500); }
  .category.estilo { color: var(--red-500); }

  /* variants */
  .hero .title { font-size: 2rem; line-height: 1.15; }
  .grid .title { font-size: 1.2rem; line-height: 1.25; }
  .list .title { font-size: 1rem; line-height: 1.3; }

  .card.feature {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  .card.feature .content { order: 1; }
  .card.feature .thumb { order: 2; }
</style>
