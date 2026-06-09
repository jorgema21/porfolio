<script lang="ts">
  import "$lib/styles/global.css";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  import { langSignal } from "$lib/i18n/lang.svelte";

  const { children } = $props();

  let showScrollTop = $state(false);

  if (browser && !localStorage.getItem("lang")) {
    const detected = navigator.language.startsWith("es") ? "es" : "en";
    langSignal.set(detected);
  }

  const handleScroll = () => {
    const documentHeight = document.documentElement.scrollHeight;

    const windowHeight = window.innerHeight;

    const totalScrollableDistance = documentHeight - windowHeight;

    if (totalScrollableDistance <= 0) {
      showScrollTop = false;
      return;
    }
    const scrollPercentage = (window.scrollY / totalScrollableDistance) * 100;

    showScrollTop = scrollPercentage >= 95;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  $effect(() => {
    if (browser) {
      document.documentElement.lang = langSignal.current;

      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (browser) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  });

  let currentPath = $derived($page.url.pathname.split("/").pop() || "Inicio");
</script>

<svelte:head>
  <title>Portfolio | Dataviz y reportajes</title>

  <meta
    name="description"
    content="Portfolio profesional de infografías, visualización de datos y reportajes."
  />

  {#if $page.url.pathname.includes("/infografias/") && $page.url.pathname
      .split("/")
      .pop() !== "infografias"}
    <meta name="robots" content="noindex, follow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Portfolio" />
  <meta property="og:title" content="Portfolio | Dataviz y reportajes" />
  <meta
    property="og:description"
    content="Narrativas visuales, análisis y visualización de datos y redacción de reportajes."
  />
  <meta property="og:image" content="/images/portfolio-og.webp" />
</svelte:head>

<div class="sr-only" role="status" aria-live="assertive" aria-atomic="true">
  Navegando a la página de {currentPath}
</div>

<Header />

<main>
  {@render children()}
</main>
<button
  class="scroll-top-btn"
  class:visible={showScrollTop}
  onclick={scrollToTop}
  aria-label="Volver al inicio de la página"
>
  <svg
    xmlns="http://w3.org"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
</button>

<Footer />
<ImageLightbox />

<style>
  .scroll-top-btn {
    position: fixed;
    bottom: var(--space-6, 24px);
    right: var(--space-6, 24px);
    z-index: 90;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    border: 1px solid var(--color-border, #e5e7eb);
    border-radius: var(--radius-full, 9999px);
    background: var(--color-white, #ffffff);
    color: var(--color-text, #111827);
    cursor: pointer;
    box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
    opacity: 0;
    pointer-events: none;
    transform: translateY(15px);
    transition:
      opacity 300ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
      background-color 200ms ease;
  }

  .scroll-top-btn svg {
    width: 16px;
    height: 16px;
    transition: transform 200ms ease;
  }

  .scroll-top-btn.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .scroll-top-btn:hover {
    background: var(--color-muted-background, #f9fafb);
  }

  .scroll-top-btn:hover svg {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .scroll-top-btn {
      bottom: var(--space-4, 16px);
      right: var(--space-4, 16px);
      width: 36px;
      height: 36px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(*),
    :global(*::before),
    :global(*::after) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }

    .scroll-top-btn {
      transition: none !important;
    }
  }
</style>
