<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";

  import ProjectHeader from "$lib/components/ProjectHeader.svelte";
  import ProjectMeta from "$lib/components/ProjectMeta.svelte";
  import ProjectTools from "$lib/components/ProjectTools.svelte";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  import "$lib/styles/article.css";
  import "$lib/styles/article-meta.css";
  import "$lib/styles/article-blocks.css";

  const { data } = $props<{ data: { project: ProjectContent } }>();

  // ✅ REACTIVIDAD CORRECTA (evita warning de Svelte)
  const project = $derived(() => data.project);

  const apartado = $derived(
    () => project().apartado as ApartadoKey | undefined,
  );

  const color = $derived(() =>
    apartado() ? APARTADOS[apartado()!].color.light : "transparent",
  );
</script>

<article
  class="article"
  data-apartado={apartado()}
  style="--apartado-color: {color()};"
>
  <ProjectHeader project={project()} />
  <ProjectMeta project={project()} />

  <section class="blocks">
    {#each project().blocks as block}
      <BlockRenderer {block} slug={project().slug} />
    {/each}
  </section>

  <ProjectTools project={project()} />
</article>
