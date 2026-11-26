<script lang="ts">
  import { t } from "#lib/i18n/index.svelte.js";
  import { langSignal } from "#lib/i18n/lang.svelte.js";

  const year = new Date().getFullYear();
  const lastUpdated = "2026-11-02";

  const formattedDate = $derived(
    new Intl.DateTimeFormat(langSignal.current === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${lastUpdated}T12:00:00Z`)),
  );
</script>

<footer class="page-footer">
  <p>{t.layout.footer.part0} © {year}</p>
  <p>{t.layout.footer.part1} {formattedDate}</p>
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
