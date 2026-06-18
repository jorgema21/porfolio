<script lang="ts">
  import { base } from "$app/paths";
  import { t, langSignal, toggleLang } from "$lib/i18n/index.svelte";
  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const navItems = [
    { href: `${base}/graphics`, key: "graphics" },
    { href: `${base}/lifestyle`, key: "lifestyle" },
    { href: `${base}/parenting`, key: "parenting" },
    { href: `${base}/about-me`, key: "about-me" },
    { href: `${base}/contact`, key: "contact" },
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

  const navLabel = (key: keyof typeof t.layout.nav) => t.layout.nav[key];
</script>

<header class="site-header">
  {#if visible >= 1}
    <button
      class="hamburger"
      class:is-open={mobileOpen}
      type="button"
      aria-label={langSignal.current === "es"
        ? "Abrir navegación"
        : "Open navigation"}
      aria-expanded={mobileOpen}
      onclick={toggleMenu}
      in:fly={flyIn}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  {/if}

  {#if visible >= 1}
    <h1 class="logo" in:fly={flyIn}>
      <a href="{base}/">{t.layout.nav.my_portfolio}</a>
    </h1>
  {/if}

  {#if visible >= 2}
    <nav class="nav desktop-nav" in:fly={{ ...flyIn, delay: 100 }}>
      {#each navItems as item (item.key)}
        <a href={item.href}>{navLabel(item.key)}</a>
      {/each}
    </nav>
  {/if}

  {#if visible >= 3}
    <button
      type="button"
      class="lang-switch"
      onclick={toggleLang}
      aria-label={langSignal.current === "es"
        ? "Cambiar idioma a inglés"
        : "Switch language to Spanish"}
      aria-pressed={langSignal.current === "en"}
      in:fly={{ ...flyIn, delay: 150 }}
    >
      <img
        src={`${base}${langSignal.current === "es" ? "/images/flags/us.svg" : "/images/flags/es.svg"}`}
        alt=""
        aria-hidden="true"
        width="20"
        height="20"
        style="display: inline-block; vertical-align: middle;"
      />
    </button>
  {/if}

  {#if mobileOpen}
    <nav
      class="mobile-nav"
      transition:fly={{ y: -12, duration: 250, easing: cubicOut }}
    >
      {#each navItems as item (item.key)}
        <a href={item.href} onclick={closeMenu}>{navLabel(item.key)}</a>
      {/each}
    </nav>
  {/if}
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-6) var(--space-8);
    margin-bottom: var(--space-8);
    background: var(--color-white);
    border-bottom: var(--border-1);
    overflow: visible;
  }

  .logo {
    margin: 0;
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    cursor: default;
    transition: opacity var(--transition-fast);
  }

  .logo a {
    color: inherit;
    text-decoration: none;
  }

  .logo:hover {
    opacity: 0.7;
  }

  .nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;

    gap: clamp(var(--space-2), 1.5vw, var(--space-8));
    white-space: nowrap;
  }

  .nav a,
  .mobile-nav a {
    position: relative;
    width: fit-content;
    padding: var(--space-1) 0;
    font-size: var(--text-sm);
    color: var(--color-text);
    text-decoration: none;
    transition: opacity var(--transition-fast);
  }

  .nav a::after,
  .mobile-nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0%;
    height: 1px;
    background: currentColor;
    transition: width var(--transition);
  }

  .nav a:hover::after,
  .mobile-nav a:hover::after {
    width: 100%;
  }

  .lang-switch {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2);
    margin-left: var(--space-4);
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: none;
    cursor: pointer;
    transition:
      border-color var(--transition-fast),
      background var(--transition-fast),
      transform var(--transition-fast);
  }

  .lang-switch:hover {
    border-color: var(--color-border);
    background: var(--bg-soft);
    transform: var(--hover-lift);
  }

  .lang-switch img {
    width: 20px;
    border-radius: var(--radius-full);
    transition: transform var(--transition-fast);
  }

  .lang-switch:hover img {
    transform: scale(1.15);
  }

  .hamburger {
    display: none;
    position: relative;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .hamburger span {
    position: absolute;
    left: 4px;
    width: 24px;
    height: 1.5px;
    background: var(--color-text);
    transition:
      top var(--transition),
      transform var(--transition),
      opacity var(--transition-fast);
  }

  .hamburger span:nth-child(1) {
    top: 10px;
  }
  .hamburger span:nth-child(2) {
    top: 16px;
  }
  .hamburger span:nth-child(3) {
    top: 22px;
  }

  .hamburger.is-open span:nth-child(1) {
    top: 16px;
    transform: rotate(45deg);
  }

  .hamburger.is-open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.is-open span:nth-child(3) {
    top: 16px;
    transform: rotate(-45deg);
  }

  .mobile-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: 100%;
    box-sizing: border-box;
    padding: 0 var(--space-4) var(--space-6);
    background: var(--color-white);
    border-bottom: var(--border-1);
  }
  @media (max-width: 860px) {
    .site-header {
      display: grid;
      grid-template-columns: 40px 1fr 40px;
      padding: var(--space-4);
      margin-bottom: var(--space-6);
    }
    .logo {
      justify-self: center;
      font-size: var(--text-lg);
    }
    .desktop-nav {
      display: none;
    }
    .lang-switch {
      justify-self: end;
      margin-left: 0;
      padding: var(--space-1);
    }
    .hamburger {
      display: block;
    }
  }
</style>
