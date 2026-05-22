<script lang="ts">
  import { langSignal } from "$lib/i18n/index.svelte";
  import type { TranslatedText } from "$lib/types/project.types";

  interface AccordionItem {
    id: string;
    title: TranslatedText;
    externalUrl?: string;
  }

  const { groups } = $props<{
    groups: { key: string; items: AccordionItem[] }[];
  }>();

  let open = $state<string | null>(null);

  const toggle = (key: string) => {
    open = open === key ? null : key;
  };
</script>

{#each groups as group (group.key)}
  <section>
    <button
      class="group-toggle"
      aria-expanded={open === group.key}
      onclick={() => toggle(group.key)}
    >
      <span>{group.key}</span>
      <span>{open === group.key ? "−" : "+"}</span>
    </button>

    {#if open === group.key}
      <ul class="list">
        {#each group.items as item (item.id)}
          <li>
            {#if item.externalUrl}
              <a
                class="link-underline"
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title[langSignal.current]}
                <svg
                  class="icon-external"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            {:else}
              <span>{item.title[langSignal.current]}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/each}

<style>
  .group-toggle {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: var(--space-3) 0;
    margin-bottom: var(--space-3);

    border: none;
    border-bottom: var(--border-1);
    background: none;

    cursor: pointer;
    font: inherit;
  }

  .group-toggle:hover {
    font-weight: 700;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);

    padding: 0;
    list-style: none;
  }
</style>
