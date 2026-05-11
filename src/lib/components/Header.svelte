<script lang="ts">
  import { t, lang, toggleLang } from "$lib/i18n";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const navItems = [
    { href: "/infografias", key: "infografias" },
    { href: "/estilo-de-vida", key: "estilo" },
    { href: "/sobre-mi", key: "about" },
    { href: "/contacto", key: "contacto" },
  ] as const;

  let visible = $state(0);
  const delay = 120;
  const total = 3;

  $effect(() => {
    visible = 0;

    let cancelled = false;

    const run = async () => {
      for (let i = 1; i <= total; i++) {
        if (cancelled) return;

        visible = i;
        await new Promise((r) => setTimeout(r, delay));
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  });

  const flyIn = {
    y: -30,
    duration: 1000,
    easing: cubicOut,
  };
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
  {#if visible >= 1}
    <h1 class="logo" in:fly={flyIn}>
      <a href="/">{$t.layout.nav.mi_porfolio}</a>
    </h1>
  {/if}

  {#if visible >= 2}
    <nav class="nav" in:fly={{ ...flyIn, delay: 100 }}>
      {#each navItems as item}
        <a href={item.href}>
          {$t.layout.nav[item.key]}
        </a>
      {/each}
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
      in:fly={{ ...flyIn, delay: 150 }}
    >
      <img
        src={$lang === "es" ? "/images/flags/gb.svg" : "/images/flags/es.svg"}
        alt=""
        aria-hidden="true"
      />
    </button>
  {/if}
</header>
