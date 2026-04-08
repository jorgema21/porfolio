<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/data/projects";
  import { lang } from "$lib/i18n/lang";
  import "$lib/styles/project-card.css";

  const { project, variant } = $props<{
    project: Project;
    variant: "hero" | "grid" | "list" | "feature";
  }>();

  const categoryLabel = $derived(
    $lang === "es"
      ? project.category === "infografia"
        ? "Infografía"
        : "Estilo"
      : project.category === "infografia"
        ? "Infographics"
        : "Style",
  );

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
      <!-- 🔥 ALT dinámico -->
      <img src={project.image} alt={project.title[$lang]} loading="lazy" />
    </div>
  {/if}

  <div class="content">
    {#if project.category}
      <span class={`category ${project.category}`}>
        {categoryLabel}
      </span>
    {/if}

    <!-- 🔥 TITLE dinámico -->
    <h2 class="title">
      {project.title[$lang]}
    </h2>

    {#if project.description}
      <!-- 🔥 DESCRIPTION dinámica -->
      <p class="description">
        {project.description[$lang]}
      </p>
    {/if}
  </div>
</a>
