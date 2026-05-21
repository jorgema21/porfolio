<script lang="ts">
  import "$lib/styles/global.css";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { lang } from "$lib/i18n/lang";

  const { children } = $props();

  if (browser) {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") {
      lang.set(saved);
    } else {
      const detected = navigator.language.startsWith("es") ? "es" : "en";
      lang.set(detected);
      localStorage.setItem("lang", detected);
    }
  }

  let currentLang = $state("es");
  lang.subscribe((value) => {
    currentLang = value;
  });

  $effect(() => {
    if (browser) {
      document.documentElement.lang = currentLang;
    }
  });

  let isHome = $derived(
    $page.url.pathname === "/" ||
      $page.url.pathname.endsWith("/portfolio") ||
      $page.url.pathname.endsWith("/portfolio/"),
  );

  let currentPath = $derived($page.url.pathname.split("/").pop() || "Inicio");
</script>

<svelte:head>
  <title>Portfolio | Dataviz y reportajes</title>

  <meta
    name="description"
    content="Portfolio profesional de infografías, visualización de datos y reportajes."
  />

  {#if isHome}
    <meta name="robots" content="index, follow" />
  {:else}
    <meta name="robots" content="noindex, follow" />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Portfolio" />
  <meta property="og:title" content="Portfolio | Dataviz y reportajes" />
  <meta
    property="og:description"
    content="Narrativas visuales, análisis y visualización de datos y redacción de reportajes."
  />
  <meta property="og:image" content="/images/portfolio-og.jpg" />
</svelte:head>

<div class="sr-only" role="status" aria-live="assertive" aria-atomic="true">
  Navegando a la página de {currentPath}
</div>

<Header />

<main>
  {@render children()}
</main>

<Footer />
<ImageLightbox />

<style>

  @media (prefers-reduced-motion: reduce) {
    :global(*),
    :global(*::before),
    :global(*::after) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
