<script lang="ts">
  import type { Project } from "$lib/data/projects";
  import "$lib/styles/layout.css";

  let { project } = $props<{ project: Project }>();
</script>

<article class="card">
  <h3>{project.title.es}</h3>
</article>

<style>
  .card {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
