<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";
  import { base } from "$app/paths";
</script>

<div class="page">
  <h1>{t.contact.title}</h1>

  <p class="page-intro">
    {t.contact.text}
  </p>

  <section class="card contact-card">
    <div class="contact-card__content stack-sm">
      <h2>{t.contact.subtitle}</h2>
      <p>{t.contact.description}</p>
    </div>

    <a class="button" href="mailto:tuemail@email.com">
      {t.contact.cta}
    </a>
  </section>

  <section class="cluster social-cluster">
    <a
      class="social-link"
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`${base}/images/logos/LinkedIn_Logo.svg`}
        alt="LinkedIn"
        class="social-icon"
      />
      LinkedIn
    </a>

    <a
      class="social-link"
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`${base}/images/logos/GitHub_logo.svg`}
        alt="GitHub"
        class="social-icon"
      />
      GitHub
    </a>
  </section>
</div>

<style>
  .contact-card {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: var(--space-8);
    padding: var(--card-padding-lg);

    border: var(--card-border);
    border-radius: var(--card-radius);
    background: var(--card-gradient-soft);

    box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.02));
    transition:
      transform var(--transition),
      box-shadow var(--transition);
  }

  .contact-card:hover {
    box-shadow: var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.05));
  }

  .contact-card__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    max-width: 52ch;
  }

  .contact-card__content h2 {
    margin: 0;
    font-size: var(--text-xl);
    line-height: var(--lh-compact);
    color: var(--color-text);
  }

  .contact-card__content p {
    margin: 0;
    line-height: var(--lh-base);
    color: var(--color-muted);
  }

  .social-cluster {
    margin-top: var(--space-6);
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);

    color: var(--color-muted);
    font-size: var(--text-sm);
    font-weight: 700;
    text-decoration: none;
    transition:
      color var(--transition),
      transform var(--transition);
  }

  .social-icon {
    width: 18px;
    height: 18px;
    opacity: 0.8;
    transition:
      transform var(--transition),
      opacity var(--transition);
  }

  .social-link:hover {
    color: var(--color-text);
    transform: translateY(-1px);
  }

  .social-link:hover .social-icon {
    opacity: 1;
  }

  .button {
    width: 100%;
    max-width: 300px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .contact-card {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-6);
      padding: var(--space-6);
    }

    .button {
      max-width: 100%;
    }
  }
</style>
