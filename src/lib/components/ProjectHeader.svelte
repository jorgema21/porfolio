<script lang="ts">
  import type { Project } from "$lib/types/project";
  import { lang } from "$lib/i18n/lang";
  import { openLightbox } from "$lib/stores/lightbox.svelte";

  const { project } = $props<{ project: Project }>();
</script>

<header class="project-header">
  <h1>
    {project.title[$lang]}
  </h1>

  {#if project.image}
    <button onclick={() => openLightbox(project.image)}>
      <img src={project.image} alt="" />
    </button>
  {/if}
</header>
