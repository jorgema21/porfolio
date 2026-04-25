<script lang="ts">
  import "$lib/styles/global.css";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";

  import { t, lang, toggleLang } from "$lib/i18n";

  const { children } = $props();
  const year = new Date().getFullYear();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />

  <link
    href="https://fonts.googleapis.com/css2?family=Epunda+Slab:wght@300..900&family=Nunito+Sans:wght@200..1000&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<header class="site-header">
  <h1 class="logo"><a href="/">{$t.layout.nav.mi_porfolio}</a></h1>

  <nav class="nav">
    <a href="/">{$t.layout.nav.home}</a>
    <a href="/infografias">{$t.layout.nav.infografias}</a>
    <a href="/estilo">{$t.layout.nav.estilo}</a>
    <a href="/sobre-mi">{$t.layout.nav.about}</a>
    <a href="/contacto">{$t.layout.nav.contacto}</a>
  </nav>

  <button
    type="button"
    class="lang-switch"
    onclick={toggleLang}
    aria-label={$lang === "es"
      ? "Cambiar idioma a inglés"
      : "Switch language to Spanish"}
    aria-pressed={$lang === "en"}
  >
    <img
      src={$lang === "es" ? "/images/flags/gb.svg" : "/images/flags/es.svg"}
      alt=""
      aria-hidden="true"
    />
  </button>
</header>

<main>
  {@render children()}
</main>

<ImageLightbox />

<footer class="page-footer">
  <p>Portfolio © {year}</p>
  <p>{$t.layout.footer.part1}</p>
  <p>{$t.layout.footer.part2}</p>
</footer>
