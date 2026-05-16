<script lang="ts">
  import type { RichText } from "$lib/i18n/rich-text.types";

  const { value } = $props<{
    value: RichText;
  }>();
</script>

<span>
  {#each value as node}
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