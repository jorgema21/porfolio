<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { lang } from "$lib/i18n/lang";
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { base } from '$app/paths';

  const { project } = $props<{ project: ProjectContent }>();

  const title = $derived(project.title[$lang]);
</script>

<header class="project-header">
  <h1>{title}</h1>

  {#if project.image}
    <button
      class="cover-wrapper"
      onclick={() => openLightbox(project.image)}
    >
      <img
        class="image image--cover"
        src={`${base}${project.image}`}
        alt=""
      />
    </button>
  {/if}
</header>