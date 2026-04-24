<script lang="ts">
  import projects from "$lib/data/projects";
  import { lang } from "$lib/i18n/lang";

  const estilo = $derived(
    projects.filter((p) => p.category === "estilo")
  );
</script>

<h1>
  {$lang === "es" ? "Estilo" : "Style"}
</h1>

<ul>
  {#each estilo as project}
    <li>
      {project.title[$lang]}
    </li>
  {/each}
</ul>