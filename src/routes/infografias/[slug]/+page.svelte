<script lang="ts">
  import type { Project, RoleType } from "$lib/types/project";

  import BlockRenderer from "$lib/components/BlockRenderer.svelte";
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { lang } from "$lib/stores/lang.svelte";

  import "$lib/styles/article.css";
  import "$lib/styles/article-meta.css";
  import "$lib/styles/article-blocks.css";

  const { data } = $props();

  const project = $derived(data.project as Project);
  const currentLang = $derived(lang);

  // -------------------------
  // DATE
  // -------------------------
  const formatDate = (d: string, l: "es" | "en") =>
    new Date(d).toLocaleDateString(l === "es" ? "es-ES" : "en-CA");

  // -------------------------
  // ROLE MAP
  // -------------------------
  const ROLE_MAP: Record<RoleType, { icon: string; es: string; en: string }> = {
    graficos: { icon: "📊", es: "Gráficos", en: "Graphics" },
    texto: { icon: "✍️", es: "Texto", en: "Writing" },
    desarrollo: { icon: "💻", es: "Desarrollo", en: "Development" },
    datos: { icon: "📈", es: "Datos", en: "Data" },
  };

  // -------------------------
  // FLAGS
  // -------------------------
  const showMeta = $derived(!!project.date || !!project.medium);
  const showApartado = $derived(!!project.apartado);
  const showUsos = $derived(!!project.usos?.length);
  const showColab = $derived(!!project.colaboracion);
</script>

<article class="article" data-apartado={project.apartado}>
  <header class="project-header">
    <h1 class="title">
      {currentLang === "es" ? project.title.es : project.title.en}
    </h1>

    <!-- COVER -->
    {#if project.image}
      {@const image = project.image}

      <button
        class="cover-wrapper"
        onclick={() => openLightbox(image)}
        aria-label="Abrir imagen"
      >
        <img src={image} alt="" class="cover" />
      </button>
    {/if}

    <!-- META -->
    {#if showMeta}
      <div class="meta">
        {#if project.medium}
          {#if project.url}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              class="medium-link"
            >
              {project.medium} ↗
            </a>
          {:else}
            <span>{project.medium}</span>
          {/if}
        {/if}

        {#if project.medium && project.date}
          <span>·</span>
        {/if}

        {#if project.date}
          <span>{formatDate(project.date, currentLang)}</span>
        {/if}
      </div>
    {/if}

    <!-- META BLOCKS -->
    {#if showApartado || showUsos || showColab}
      <div class="meta-blocks">
        {#if project.apartado}
          <span class="apartado">{project.apartado}</span>
        {/if}

        {#if project.usos?.length}
          <div class="meta-list">
            {#each project.usos as uso}
              <span class="tag">{uso}</span>
            {/each}
          </div>
        {/if}

        {#if project.colaboracion}
          {@const { tipo, rol } = project.colaboracion}

          <div class="meta-colab">
            <span>
              {tipo === "solo"
                ? currentLang === "es"
                  ? "👤 En solitario"
                  : "👤 Solo"
                : currentLang === "es"
                  ? "👥 En equipo"
                  : "👥 Team"}
            </span>

            <div class="roles">
              {#each rol as r}
                <span class="role">
                  {ROLE_MAP[r].icon}
                  {currentLang === "es" ? ROLE_MAP[r].es : ROLE_MAP[r].en}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </header>

  <!-- CONTENT -->
  <section class="blocks">
    {#each project.blocks as block}
      <BlockRenderer {block} slug={project.slug} />
    {/each}
  </section>

  <!-- TOOLS -->
  {#if project.tools?.length}
    <footer class="tools">
      <h3>{currentLang === "es" ? "Herramientas" : "Tools"}</h3>

      <ul>
        {#each project.tools as tool}
          <li>{tool}</li>
        {/each}
      </ul>
    </footer>
  {/if}
</article>
