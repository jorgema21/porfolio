<script lang="ts">
  import type { Project } from "$lib/data/projects";
  import { lang } from "$lib/i18n/lang";
  import { goto } from "$app/navigation";

  const { project } = $props<{ project: Project }>();

  const href = $derived(`/infografias/${project.slug}`);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    goto(href);
  };
</script>

<a class="infographics-card" href={href} onclick={handleClick}>
  <div class="thumb">
    <img
      src={project.image}
      alt={project.title[$lang]}
      loading="lazy"
    />

    <div class="overlay">
      <h3>{project.title[$lang]}</h3>
    </div>
  </div>
</a>