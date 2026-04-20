<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/types/project";
  import { lang, t } from "$lib/i18n";
  import "$lib/styles/project-card.css";

  const { project, variant } = $props<{
    project: Project;
    variant: "hero" | "grid" | "list" | "feature";
  }>();

  const clickable = $derived(
    project.category === "infografia" || !!project.externalUrl
  );

  const href = $derived(
    project.category === "infografia"
      ? `/infografias/${project.slug}`
      : project.externalUrl
  );

  const isExternal = $derived(
    project.category === "estilo" && !!project.externalUrl
  );

  function handleClick(e: MouseEvent) {
    if (!clickable) {
      e.preventDefault();
      return;
    }

    if (!isExternal) {
      e.preventDefault();
      goto(href!);
    }
  }
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
      <img src={project.image} alt={project.title[$lang]} loading="lazy" />
    </div>
  {/if}

  <div class="content">
    <span class={`category ${project.category}`}>
      {$t.project.category[project.category as "infografia" | "estilo"]}
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