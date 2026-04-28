<script lang="ts">
  import "$lib/styles/global.css";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";

  import { t, lang, toggleLang } from "$lib/i18n";

  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const { children } = $props();
  const year = new Date().getFullYear();

  let visible = $state(0);
  const delay = 120;

  $effect(() => {
    visible = 0;

    let i = 0;
    const total = 3;

    const interval = setInterval(() => {
      visible = i + 1;
      i++;

      if (i >= total) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  });
</script>

<header class="site-header">
  {#if visible >= 1}
    <h1
      class="logo"
      in:fly={{ y: -30, duration: 1000, easing: cubicOut }}
    >
      <a href="/">{$t.layout.nav.mi_porfolio}</a>
    </h1>
  {/if}

  {#if visible >= 2}
    <nav
      class="nav"
      in:fly={{ y: -30, duration: 1000, delay:100, easing: cubicOut }}
    >
      <a href="/infografias">{$t.layout.nav.infografias}</a>
      <a href="/estilo">{$t.layout.nav.estilo}</a>
      <a href="/sobre-mi">{$t.layout.nav.about}</a>
      <a href="/contacto">{$t.layout.nav.contacto}</a>
    </nav>
  {/if}

  {#if visible >= 3}
    <button
      type="button"
      class="lang-switch"
      onclick={toggleLang}
      aria-label={$lang === "es"
        ? "Cambiar idioma a inglés"
        : "Switch language to Spanish"}
      aria-pressed={$lang === "en"}
      in:fly={{ y: -30, duration: 1000, delay:150, easing: cubicOut }}
    >
      <img
        src={$lang === "es" ? "/images/flags/gb.svg" : "/images/flags/es.svg"}
        alt=""
        aria-hidden="true"
      />
    </button>
  {/if}
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