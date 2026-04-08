<script lang="ts">
  import { t, lang, toggleLang } from "$lib/i18n";
  import "$lib/styles/page.css";
</script>

<main class="page">
  <h1>{$t.contact.title}</h1>

  <p>{$t.contact.text}</p>

  <a href="mailto:tuemail@email.com">
    {$t.contact.cta}
  </a>
</main>