<script lang="ts">
  import { base } from "$app/paths";

  import type { HomeProject, ProjectCategory } from "$lib/data/projects";

  import { lang, t } from "$lib/i18n";

  const { project } = $props<{
    project: HomeProject;
  }>();

  const isInfographic = $derived(project.category === "infografia");

  const isExternal = $derived(
    project.category !== "infografia" && !!project.externalUrl,
  );

  const href = $derived(
    isInfographic ? `${base}/infografias/${project.slug}` : project.externalUrl,
  );

  const canNavigate = $derived(!!href);

  const imageSrc = $derived(
    project.image?.startsWith("http")
      ? project.image
      : `${base}${project.image}`,
  );
</script>

<a
  class="card"
  class:hero={project.variant === "hero"}
  class:grid={project.variant === "grid"}
  class:list={project.variant === "list"}
  class:feature={project.variant === "feature"}
  href={href ?? undefined}
  target={isExternal ? "_blank" : undefined}
  rel={isExternal ? "noopener noreferrer" : undefined}
  aria-disabled={!canNavigate}
  tabindex={canNavigate ? 0 : -1}
>
  {#if project.image && project.variant !== "list"}
    <div class="thumb">
      <img src={imageSrc} alt={project.title[$lang]} loading="lazy" />
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
