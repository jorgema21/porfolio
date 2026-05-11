<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { APARTADOS, type ApartadoKey } from "$lib/config/apartados.config";

  import ProjectHeader from "$lib/components/ProjectHeader.svelte";
  import ProjectMeta from "$lib/components/ProjectMeta.svelte";
  import ProjectTools from "$lib/components/ProjectTools.svelte";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  const { data } = $props<{ data: { project: ProjectContent } }>();

  const project = $derived(() => data.project);

  const apartado = $derived(
    () => project().apartado as ApartadoKey | undefined
  );

  const color = $derived(() =>
    apartado()
      ? APARTADOS[apartado()!].color.light
      : "transparent"
  );

  const blocks = $derived(() => project().blocks);
</script>

<article
  class="article"
  data-apartado={apartado()}
  style="--apartado-color: {color()};"
>
  <ProjectHeader project={project()} />
  <ProjectMeta project={project()} />

  <section class="blocks">
    {#each blocks() as block (block)}
      <BlockRenderer {block} slug={project().slug} />
    {/each}
  </section>

  <ProjectTools project={project()} />
</article>