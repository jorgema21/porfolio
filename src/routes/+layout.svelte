<script lang="ts">
	let { children } = $props();
</script>

<header>
	<h1>Mi Portfolio</h1>
	<nav>
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