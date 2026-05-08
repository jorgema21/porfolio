<script lang="ts">
  import { t } from "$lib/i18n";
</script>

<main class="page">
  <h1>{$t.contact.title}</h1>

  <p class="page-intro">
    {$t.contact.text}
  </p>

  <section class="card contact-card">
    <div class="contact-card__content stack-sm">
      <h2>{$t.contact.subtitle}</h2>
      <p>{$t.contact.description}</p>
    </div>

    <a class="button" href="mailto:tuemail@email.com">
      {$t.contact.cta}
    </a>
  </section>

  <section class="cluster">
    <a class="social-link" href="https://linkedin.com" target="_blank">
      <img src="/images/icons/linkedin.png" alt="LinkedIn" />
      LinkedIn
    </a>

    <a class="social-link" href="https://github.com" target="_blank">
      <img src="/images/icons/github.png" alt="GitHub" />
      GitHub
    </a>

    <a class="social-link" href="https://instagram.com" target="_blank">
      <img src="/images/icons/instagram.png" alt="Instagram" />
      Instagram
    </a>
  </section>
</main>