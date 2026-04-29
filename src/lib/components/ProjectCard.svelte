<script lang="ts">
  import type { HomeProject, ProjectCategory } from "$lib/data/projects";
  import { lang, t } from "$lib/i18n";

  const { project, variant } = $props<{
    project: HomeProject;
    variant: "hero" | "grid" | "list" | "feature";
  }>();

  const href = $derived(
    project.category === "infografia"
      ? `/infografias/${project.slug}`
      : project.externalUrl
  );

  const isExternal = $derived(
    project.category === "estilo_de_vida" && !!project.externalUrl
  );

  const canNavigate = $derived(!!href);
</script>

<a
  class="card"
  class:hero={variant === "hero"}
  class:grid={variant === "grid"}
  class:list={variant === "list"}
  class:feature={variant === "feature"}
  href={href ?? undefined}
  target={isExternal ? "_blank" : undefined}
  rel={isExternal ? "noopener noreferrer" : undefined}
  aria-disabled={!canNavigate}
  tabindex={canNavigate ? 0 : -1}
>
  {#if project.image && variant !== "list"}
    <div class="thumb">
      <img
        src={project.image}
        alt={project.title[$lang]}
        loading="lazy"
      />
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