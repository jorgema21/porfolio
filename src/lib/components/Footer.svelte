<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";

  const year = new Date().getFullYear();
</script>

<footer class="page-footer">
  <p>Portfolio © {year}</p>
  <p>{t.layout.footer.part1}</p>
  <p>{t.layout.footer.part2}</p>
</footer>

<style>
  footer.page-footer {
    margin-top: auto;
  }
  .page-footer {
    padding: var(--space-4);

    text-align: right;

    font: var(--text-xs) var(--font-sans);

    color: var(--color-text);
    background-color: var(--color-border);
  }

  @media (max-width: 768px) {
    .page-footer {
      text-align: left;
    }
  }
</style>
