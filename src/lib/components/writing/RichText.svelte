<script lang="ts">
  import type { RichText } from "#lib/i18n/rich-text.types.js";

  const { value }: {
    value: RichText;
  } = $props();
</script>

<span>
  {#each value as node, i (i)}
    {#if typeof node === "string"}
      {node}
    {:else if node.bold}
      <strong>{node.text}</strong>
    {:else if node.italic}
      <em>{node.text}</em>
    {:else}
      {node.text}
    {/if}
  {/each}
</span>
