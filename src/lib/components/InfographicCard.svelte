<script lang="ts">
  import type { Infographic } from "$lib/data/infographics.data";
  import { lang } from "$lib/i18n/lang";

  const { project } = $props<{ project: Infographic }>();

  const href = $derived(`/infografias/${project.slug}`);
</script>

<a class="infographics-card" href={href}>
  <div class="thumb">
    <img src={project.image} alt={project.title[$lang]} loading="lazy" />

    <div class="overlay">
      <h3>{project.title[$lang]}</h3>
    </div>
  </div>
</a>