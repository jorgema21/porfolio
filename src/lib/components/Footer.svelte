<script lang="ts">
  import { t } from "$lib/i18n";

  const year = new Date().getFullYear();
</script>

<footer class="page-footer">
  <p>Portfolio © {year}</p>
  <p>{$t.layout.footer.part1}</p>
  <p>{$t.layout.footer.part2}</p>
</footer>