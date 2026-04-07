<script lang="ts">
  import type { Project } from "$lib/types/project";

  import ProjectHeader from "$lib/components/ProjectHeader.svelte";
  import ProjectMeta from "$lib/components/ProjectMeta.svelte";
  import ProjectTools from "$lib/components/ProjectTools.svelte";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  import "$lib/styles/article.css";
  import "$lib/styles/article-meta.css";
  import "$lib/styles/article-blocks.css";

  const { data } = $props();

  const project = $derived(data.project as Project);
</script>

<article class="article" data-apartado={project.apartadoKey}>
  <ProjectHeader {project} />
  <ProjectMeta {project} />

  <section class="blocks">
    {#each project.blocks as block}
      <BlockRenderer {block} slug={project.slug} />
    {/each}
  </section>

  <ProjectTools {project} />
</article>
