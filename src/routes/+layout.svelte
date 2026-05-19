<script lang="ts">
  import "$lib/styles/global.css";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  const { children } = $props();
</script>

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
