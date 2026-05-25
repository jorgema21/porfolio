<script lang="ts">
  import { base } from "$app/paths";
  import { openLightbox } from "$lib/state/lightbox.svelte";
  import { langSignal, t } from "$lib/i18n/index.svelte";
  import { APARTADOS } from "$lib/config/apartados.config";
  import { ROLE_MAP } from "$lib/config/roles";
  import { formatDate } from "$lib/utils/formatDate";
  import { createProjectView } from "$lib/infographics/project.view";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import type { ProjectContent } from "$lib/types/project.types";

  const { data } = $props<{ data: { project: ProjectContent } }>();

  const view = $derived(createProjectView(langSignal.current));
  const project = $derived(data?.project);
  const colab = $derived(project?.colaboracion);

  const color = $derived(
    project?.apartado
      ? APARTADOS[project.apartado as keyof typeof APARTADOS]?.color?.light
      : "transparent",
  );
  const apartadoLabel = $derived(view.apartadoLabel(project));

  const mediumLabel = $derived.by(() => {
    if (!project?.mediumKey) return null;
    const dict = infographicsI18n[langSignal.current].mediums;
    return project.mediumKey in dict
      ? dict[project.mediumKey as keyof typeof dict]
      : null;
  });

  const hasMeta = $derived(
    !!mediumLabel ||
      !!project?.date ||
      !!apartadoLabel ||
      !!project?.usos?.length ||
      !!colab?.tipo ||
      !!colab?.rol?.length,
  );
</script>

<article
  class="article"
  data-apartado={project?.apartado}
  style="--apartado-color: {color};"
>
  <header class="project-header">
    <h1>{view.title(project) ?? ""}</h1>
    {#if project?.image}
      {@const src = `${base}${project.image}`}
      <button
        class="cover-wrapper"
        onclick={() => openLightbox(src)}
        aria-label="Ampliar portada"
      >
        <img class="image image--cover" {src} alt="" />
      </button>
    {/if}
  </header>

  {#if hasMeta}
    <div class="meta-top">
      <div class="meta-row meta-left">
        {#if mediumLabel}
          <a class="link-underline medium-link" href={project?.url ?? "#"}>
            {mediumLabel}
            {#if project?.url}
              <svg
                class="icon-external"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            {/if}
          </a>
        {/if}
        {#if project?.mediumKey && project?.date}<span>·</span>{/if}
        {#if project?.date}<span
            >{formatDate(project.date, langSignal.current)}</span
          >{/if}
      </div>

      <div class="meta-row meta-center">
        <div class="meta-colabs">
          {#if colab?.tipo}
            <span class="tag"
              >{t.metaarticle.colaboracion[colab.tipo as "solo" | "equipo"] ??
                colab.tipo}</span
            >
          {/if}

          {#each colab?.rol ?? [] as roleKey (roleKey)}
            {@const role = ROLE_MAP[roleKey as keyof typeof ROLE_MAP]}
            {#if role}
              <span class="tag" title={role.label[langSignal.current]}>
                <span>{role.icon}</span>
                <span>{role.label[langSignal.current]}</span>
              </span>
            {/if}
          {/each}
        </div>

        {#if project?.usos?.length && (colab?.tipo || colab?.rol?.length)}
          <span class="meta-divider">|</span>
        {/if}

        {#if project?.usos?.length}
          <div class="meta-usos">
            {#each project.usos as uso (uso.es)}
              <span class="tag">{uso[langSignal.current]}</span>
            {/each}
          </div>
        {/if}
      </div>

      {#if apartadoLabel}
        <div class="meta-row meta-right">
          <span class="badge apartado">{apartadoLabel}</span>
        </div>
      {/if}
    </div>
  {/if}

  <section class="blocks">
    {#each project?.blocks ?? [] as block, i (i)}
      {@const src =
        "src" in block
          ? `${base}/images/infografias/${project?.slug}/${block.src}`
          : ""}

      {#if block.type === "hero" || block.type === "image"}
        <div class="image-wrapper">
          {#if block.caption?.[langSignal.current]}<span class="image-title"
              >{block.caption[langSignal.current]}</span
            >{/if}
          <button onclick={() => openLightbox(src)} aria-label="Ampliar imagen">
            <img
              class="image image--{block.type}"
              {src}
              alt={block.alt?.[langSignal.current] ?? ""}
              loading="lazy"
            />
          </button>
        </div>
      {:else if block.type === "text"}
        {@const val = block.value?.[langSignal.current] ?? block.value?.es}
        <p class="text">{Array.isArray(val) ? val.join(" ") : (val ?? "")}</p>
      {:else if block.type === "divider"}
        <div class="divider"></div>
      {/if}
    {/each}
  </section>

  {#if project?.tools?.length}
    <footer class="tools">
      <h3>{t.metaarticle.tools}</h3>
      <ul>
        {#each project.tools as tool (tool)}
          <li class="tag">{tool}</li>
        {/each}
      </ul>
    </footer>
  {/if}
</article>

<style>
  .article {
    max-width: var(--content-width);
    margin-inline: auto;
    padding: 0 var(--space-6) var(--space-12);
    font-family: var(--font-serif);
    line-height: var(--lh-base);
  }
  .cover-wrapper,
  .image-wrapper button {
    display: block;
    width: 100%;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  .meta-top {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    margin-top: var(--space-2);
    padding-top: var(--space-4);
    width: 100%;
  }
  .meta-top::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 1px;
    background: var(--apartado-color);
    opacity: 0.4;
  }
  .meta-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .meta-left {
    font-size: var(--text-sm);
    color: var(--color-muted);
  }
  .meta-center {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .meta-colabs,
  .meta-usos {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .meta-divider {
    color: var(--color-border);
    margin-inline: var(--space-1);
    font-weight: 300;
  }

  .tag {
    background-color: var(--bg-soft);
    border: var(--border-1);
    border-radius: var(--radius-sm);
    padding: var(--space-1) var(--space-2);
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    color: var(--color-text-base);
  }

  .medium-link {
    color: inherit;
    transition: color var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
  }
  .medium-link:hover {
    color: var(--blue-500);
  }

  .apartado {
    --badge-color: var(--apartado-color);
  }

  .blocks {
    margin-top: var(--space-8);
  }
  .project-header h1 {
    margin: 0;
    font: var(--text-2xl) var(--font-serif);
  }
  .text {
    margin-block: var(--space-6);
    font-size: var(--text-base);
    line-height: var(--lh-base);
  }
  .image {
    width: 100%;
    border-radius: var(--radius-lg);
    object-fit: cover;
    cursor: zoom-in;
    transition: transform var(--transition);
  }
  .image:hover {
    transform: scale(1.01);
  }
  .image--image {
    width: 90%;
    margin-block: var(--space-8);
  }
  .image--cover {
    height: 420px;
    margin: var(--space-6) 0 var(--space-4);
    border-radius: var(--radius-xl);
  }
  .image-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .image-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font: var(--text-sm) var(--font-sans);
    text-decoration: underline;
  }

  .tools h3 {
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
  .tools ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (max-width: 768px) {
    .image--cover {
      height: auto;
      object-fit: contain;
    }
    .image--image {
      width: 100%;
    }
    .image-title {
      position: static;
      margin-bottom: var(--space-2);
      transform: none;
      text-align: center;
    }
    .meta-center {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }

    .meta-colabs,
    .meta-usos {
      width: 100%;
    }

    .meta-divider {
      display: none;
    }
  }
</style>
