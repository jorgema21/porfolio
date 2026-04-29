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

  <ImageLightbox />
</main>
<Footer />
