<script lang="ts">
  import { t } from "$lib/i18n";
</script>

<main class="page">
  <h1>
    {$t.contact.title}
  </h1>

  <!-- intro igual que style -->
  <p class="page-intro">
    {$t.contact.text}
  </p>

  <section class="contact-card">
    <div class="contact-card__content">
      <h2>
        {$t.contact.subtitle}
      </h2>

      <p>
        {$t.contact.description}
      </p>
    </div>

    <a class="contact-button" href="mailto:tuemail@email.com">
      {$t.contact.cta}
    </a>
  </section>

  <section class="contact-links">
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <img src="/images/icons/linkedin.png" alt="LinkedIn" />
      LinkedIn
    </a>

    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
      <img src="/images/icons/github.png" alt="GitHub" />
      GitHub
    </a>

    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <img src="/images/icons/instagram.png" alt="Instagram" />
      Instagram
    </a>
  </section>
</main>