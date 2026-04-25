<script lang="ts">
  import projects from "$lib/data/projects";
  import { t, lang, toggleLang } from "$lib/i18n";
  import "$lib/styles/page.css";

  const estilo = $derived(
    projects.filter((p) => p.category === "estilo")
  );
</script>



<main class="page">
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

  FALTA DICCIONARIO
</main>
