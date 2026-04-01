<script lang="ts">
  import "$lib/styles/global.css";

  const { children } = $props();
</script>

<svelte:head>
  <!-- Preconnect performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Epunda+Slab:wght@300..900&family=Nunito+Sans:wght@200..1000&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<header class="site-header">
  <h1 class="logo">Mi Portfolio</h1>

  <nav class="nav">
    <a href="/">Inicio</a>
    <a href="/infografias">Infografías</a>
    <a href="/estilo">Estilo</a>
    <a href="/sobre-mi">Sobre mí</a>
    <a href="/contacto">Contacto</a>
  </nav>
</header>

<main>
  {@render children()}
</main>

<footer class="site-footer">
  <p>Portfolio © {new Date().getFullYear()}</p>
</footer>
