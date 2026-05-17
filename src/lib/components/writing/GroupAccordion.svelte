<script lang="ts">
  import { lang } from "$lib/i18n";
  import type { TranslatedText } from "$lib/types/project.types";

  // CORRECCIÓN: 'id' es obligatorio y 'externalUrl' ahora es opcional (?)
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
        <!-- CORRECCIÓN: Usamos 'item.id' como clave del bucle, garantizado que existe -->
        {#each group.items as item (item.id)}
          <li>
            {#if item.externalUrl}
              <a
                class="link-underline"
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title[$lang]} ↗
              </a>
            {:else}
              <span>{item.title[$lang]}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/each}
