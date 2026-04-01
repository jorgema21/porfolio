<script lang="ts">
  import type { Project } from "$lib/data/projects";

  const { project, variant } = $props<{
    project: Project;
    variant: "hero" | "grid" | "list" | "feature";
  }>();
</script>

<article class={`card ${variant}`}>
  {#if variant === "feature"}
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

    {#if project.image}
      <div class="image">
        <img src={project.image} alt={project.title.es} />
      </div>
    {/if}
  {:else}
    {#if project.image && variant !== "list"}
      <div class="image">
        <img src={project.image} alt={project.title.es} />
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
  {/if}
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }

  /* BASE */
  .image {
    width: 100%;
    overflow: hidden;
  }

  /* HERO / FEATURE / BOTTOM = mismo peso visual */
  .hero .image,
  .feature .image,
  .bottom .image {
    aspect-ratio: 16/9;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-family: var(--font-serif);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.01em;
    max-width: 22ch;
  }

  .description {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 350;
    color: var(--color-muted);
    max-width: 50ch;
  }

  .category {
    font-family: var(--font-sans);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }
  .category.infografia {
    color: var(--blue-500);
  }
  .category.estilo {
    color: var(--red-500);
  }

  /* VARIANTS */

  .hero .title {
    font-size: 2rem;
  }

  .grid .title {
    font-size: 1.2rem;
  }

  .list .title {
    font-size: 1rem;
  }

  .feature {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
</style>
