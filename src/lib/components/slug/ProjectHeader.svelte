<script lang="ts">
  import type { ProjectContent } from "$lib/types/project.types";
  import { lang } from "$lib/i18n/lang";
  import { openLightbox } from "$lib/stores/lightbox.svelte";
  import { base } from "$app/paths";

  const { project } = $props<{
    project: ProjectContent;
  }>();

  const title = $derived(project.title[$lang]);

  const imageSrc = $derived(
    project.image
      ? `${base}${project.image}`
      : null
  );
</script>

<header class="project-header">
  <h1>{title}</h1>

  {#if imageSrc}
    <button
      class="cover-wrapper"
      onclick={() => openLightbox(imageSrc)}
    >
      <img
        class="image image--cover"
        src={imageSrc}
        alt=""
      />
    </button>
  {/if}
</header>