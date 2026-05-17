<script lang="ts">
  import { base } from "$app/paths";
  import { t, lang, toggleLang } from "$lib/i18n";

  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const navItems = [
    { href: `${base}/infografias`, key: "infografias" },
    { href: `${base}/estilo-de-vida`, key: "estilo" },
    { href: `${base}/maternidad`, key: "maternidad" },
    { href: `${base}/sobre-mi`, key: "about" },
    { href: `${base}/contacto`, key: "contacto" },
  ] as const;

  const delay = 120;
  const total = 3;

  let visible = $state(0);
  let mobileOpen = $state(false);

  $effect(() => {
    visible = 0;
    let cancelled = false;

    (async () => {
      for (let i = 1; i <= total; i++) {
        if (cancelled) return;
        visible = i;
        await new Promise((r) => setTimeout(r, delay));
      }
    })();

    return () => {
      cancelled = true;
    };
  });

  const flyIn = {
    y: -30,
    duration: 1000,
    easing: cubicOut,
  };

  const toggleMenu = () => (mobileOpen = !mobileOpen);
  const closeMenu = () => (mobileOpen = false);

  // ✨ microoptimización i18n
  const navLabel = (key: keyof typeof $t.layout.nav) => {
    return $t.layout.nav[key];
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

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<header class="site-header">
  <!-- HAMBURGER -->
  {#if visible >= 1}
    <button
      class={`hamburger ${mobileOpen ? "is-open" : ""}`}
      type="button"
      aria-label="Abrir navegación"
      aria-expanded={mobileOpen}
      onclick={toggleMenu}
      in:fly={flyIn}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  {/if}

  <!-- LOGO -->
  {#if visible >= 1}
    <h1 class="logo" in:fly={flyIn}>
      <a href="{base}/">
        {$t.layout.nav.mi_porfolio}
      </a>
    </h1>
  {/if}

  <!-- DESKTOP NAV -->
  {#if visible >= 2}
    <nav class="nav desktop-nav" in:fly={{ ...flyIn, delay: 100 }}>
      {#each navItems as item (item.key)}
        <a href={item.href}>
          {navLabel(item.key)}
        </a>
      {/each}
    </nav>
  {/if}

  <!-- LANG -->
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
        src="{base}{$lang === 'es'
          ? '/images/flags/gb.svg'
          : '/images/flags/es.svg'}"
        alt=""
        aria-hidden="true"
      />
    </button>
  {/if}

  <!-- MOBILE NAV -->
  {#if mobileOpen}
    <nav
      class="mobile-nav"
      transition:fly={{
        y: -12,
        duration: 250,
        easing: cubicOut,
      }}
    >
      {#each navItems as item (item.key)}
        <a href={item.href} onclick={closeMenu}>
          {navLabel(item.key)}
        </a>
      {/each}
    </nav>
  {/if}
</header>
