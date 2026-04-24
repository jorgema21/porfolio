<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { lang } from "$lib/i18n/lang";
  import { openLightbox } from "$lib/stores/lightbox.svelte";

  const { project } = $props<{ project: ProjectContent }>();
</script>

<header class="project-header">
  <h1>
    {project.title[$lang]}
  </h1>

  {#if project.image}
    <button class="cover-wrapper" onclick={() => openLightbox(project.image)}>
      <img class="cover" src={project.image} alt="" />
    </button>
  {/if}
</header>
