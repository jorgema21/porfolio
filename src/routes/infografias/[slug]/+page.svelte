<script lang="ts">
  import type { Project } from "$lib/types/project";
  import BlockRenderer from "$lib/components/BlockRenderer.svelte";

  const { data } = $props();
  const project = $derived(data.project as Project);

  const showMeta = $derived(!!project.date || !!project.medium);
  const showTags = $derived(!!project.tags?.length);
  const showTools = $derived(!!project.tools?.length);
</script>

<article class="project">
  <header class="project-header">
    <p class="category">{project.category}</p>

    <h1 class="title">{project.title.es}</h1>

    {#if project.image}
      <img src={project.image} alt="" class="cover" />
    {/if}

    {#if showMeta}
      <div class="meta">
        {#if project.medium}<span>{project.medium}</span>{/if}
        {#if project.medium && project.date}<span>·</span>{/if}
        {#if project.date}<span>{project.date}</span>{/if}
      </div>
    {/if}

    {#if showTags}
      <div class="tags">
        {#each project.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </header>

  <section class="blocks">
    {#each project.blocks as block}
      <BlockRenderer {block} slug={project.slug} />
    {/each}
  </section>

  {#if showTools}
    <footer class="tools">
      <h3>Herramientas</h3>
      <ul>
        {#each project.tools as tool}
          <li>{tool}</li>
        {/each}
      </ul>
    </footer>
  {/if}
</article>