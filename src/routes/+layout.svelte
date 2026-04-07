<script lang="ts">
  import "$lib/styles/global.css";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";

  import { lang, toggleLang } from "$lib/i18n/lang";
  import { initLang } from "$lib/i18n/initLang";
  import { t } from "$lib/i18n/t";

  import { onMount } from "svelte";

  const { children } = $props();
  const year = new Date().getFullYear();

  onMount(() => {
    initLang();
  });
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
  <h1 class="logo">Mi Portfolio</h1>

  <nav class="nav">
    <a href="/">{$t.nav.home}</a>
    <a href="/infografias">{$t.nav.infografias}</a>
    <a href="/estilo">{$t.nav.estilo}</a>
    <a href="/sobre-mi">{$t.nav.about}</a>
    <a href="/contacto">{$t.nav.contacto}</a>
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
      src={$lang === "es" ? "/flags/gb.svg" : "/flags/es.svg"}
      alt=""
      aria-hidden="true"
    />
  </button>
</header>

<main>
  {@render children()}
</main>

<ImageLightbox />

<footer>
  <p>Portfolio © {year}</p>
</footer>
