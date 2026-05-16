<script lang="ts">
  import { lang } from "$lib/i18n";
  const { groups } = $props<{
    groups: { key: string; items: any[] }[];
  }>();

  let open = $state<string | null>(null);

  const toggle = (key: string) => {
    open = open === key ? null : key;
  };
</script>

{#each groups as group}
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
        {#each group.items as item}
          <li>
            <a class="link-underline" href={item.externalUrl} target="_blank">
              {item.title[$lang]} ↗
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
{/each}
