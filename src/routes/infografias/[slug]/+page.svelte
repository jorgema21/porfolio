<script lang="ts">
  import { base } from "$app/paths";
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { lang } from "$lib/i18n";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";
  import { formatDate } from "$lib/utils/formatDate";
  import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
  import type { ProjectContent } from "$lib/types/project.types";

  const { data } = $props<{ data: { project: ProjectContent } }>();

  const project = $derived(data?.project);
  const apartado = $derived(project?.apartado as ApartadoKey | undefined);
  const color = $derived(
    apartado ? APARTADOS[apartado]?.color?.light : "transparent",
  );
  const blocks = $derived(project?.blocks ?? []);

  const apartadoLabel = $derived(
    apartado && apartado in APARTADOS ? APARTADOS[apartado].label[$lang] : null,
  );

  const mediumLabel = $derived.by(() => {
    if (!project?.mediumKey) return null;
    const dict = infographicsI18n[$lang].mediums;
    return project.mediumKey in dict
      ? dict[project.mediumKey as keyof typeof dict]
      : null;
  });

  const hasMeta = $derived(
    !!mediumLabel ||
      !!project?.date ||
      !!apartadoLabel ||
      !!project?.usos?.length,
  );
</script>

<article
  class="article"
  data-apartado={apartado}
  style="--apartado-color: {color};"
>
  <header class="project-header">
    <h1>{project?.title?.[$lang] ?? ""}</h1>
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
      <div class="meta-left">
        {#if mediumLabel}
          {#if project?.url}<a
              class="link-underline medium-link"
              href={project.url}>{mediumLabel} ↗</a
            >
          {:else}<span class="link-underline">{mediumLabel}</span>{/if}
        {/if}
        {#if project?.mediumKey && project?.date}<span>·</span>{/if}
        {#if project?.date}<span>{formatDate(project.date, $lang)}</span>{/if}
      </div>

      {#if project?.usos?.length}
        <div class="meta-center">
          {#each project.usos as uso, i (i)}
            <span class="tag">{uso[$lang]}</span>
          {/each}
        </div>
      {/if}

      {#if apartadoLabel}
        <div class="meta-right">
          <span class="badge apartado">{apartadoLabel}</span>
        </div>
      {/if}
    </div>
  {/if}

  <section class="blocks">
    {#each blocks as block, i (i)}
      {@const src =
        "src" in block
          ? `${base}/images/infografias/${project?.slug}/${block.src}`
          : ""}

      {#if block.type === "hero" || block.type === "image"}
        <div class="image-wrapper">
          {#if block.caption?.[$lang]}<span class="image-title"
              >{block.caption[$lang]}</span
            >{/if}
          <button onclick={() => openLightbox(src)} aria-label="Ampliar imagen">
            <img
              class="image image--{block.type}"
              {src}
              alt={block.alt?.[$lang] ?? ""}
              loading="lazy"
            />
          </button>
        </div>
      {:else if block.type === "text"}
        {@const val = block.value?.[$lang] ?? block.value?.es}
        {@const textString = Array.isArray(val) ? val.join(" ") : (val ?? "")}
        <p class="text">{textString}</p>
      {:else if block.type === "divider"}
        <div class="divider"></div>
      {/if}
    {/each}
  </section>

  {#if project?.tools?.length}
    <footer class="tools">
      <h3>{$lang === "es" ? "Herramientas" : "Tools"}</h3>
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
    line-height: 1.75;
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
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-2);
    margin-top: var(--space-2);
    padding-top: var(--space-2);
  }
  .meta-top::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 2px;
    background: var(--apartado-color);
    opacity: 0.6;
  }
  .meta-left,
  .meta-center,
  .meta-right {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .meta-center {
    justify-content: center;
    flex-wrap: wrap;
  }
  .meta-right {
    justify-content: flex-end;
  }
  .medium-link {
    color: inherit;
    transition: color var(--transition);
  }
  .medium-link:hover {
    color: var(--blue-300);
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
    line-height: 1.85;
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
    margin-bottom: var(--space-2);
    font-size: var(--text-xs);
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
    .meta-top {
      grid-template-columns: 1fr;
      gap: var(--space-3);
    }
    .meta-left,
    .meta-center,
    .meta-right {
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
