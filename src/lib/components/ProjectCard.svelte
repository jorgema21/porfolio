<script lang="ts">
  import type { HomeProject } from "$lib/data/projects";
  import { lang, t } from "$lib/i18n";

  const { project, variant } = $props<{
    project: HomeProject;
    variant: "hero" | "grid" | "list" | "feature";
  }>();

  const href = $derived(() => {
    if (project.category === "infografia") {
      return `/infografias/${project.slug}`;
    }
    return project.externalUrl ?? null;
  });

  const isExternal = $derived(
    () => project.category === "estilo" && !!project.externalUrl
  );

  const canNavigate = $derived(() => !!href());
</script>

<a
  class={`card ${variant}`}
  href={href() ?? undefined}
  target={isExternal() ? "_blank" : undefined}
  rel={isExternal() ? "noopener noreferrer" : undefined}
  aria-disabled={!canNavigate()}
  tabindex={canNavigate() ? 0 : -1}
>
  {#if project.image && variant !== "list"}
    <div class="thumb">
      <img src={project.image} alt={project.title[$lang]} loading="lazy" />
    </div>
  {/if}

  <div class="content">
    <span class={`category ${project.category}`}>
      {$t.project.category[project.category as keyof typeof $t.project.category]}
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