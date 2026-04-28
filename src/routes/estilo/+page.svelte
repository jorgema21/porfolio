<script lang="ts">
  import projects from "$lib/data/projects";
  import { lang } from "$lib/i18n";
  import { style } from "$lib/i18n/dictionaries/style.i18n";

  type Project = (typeof projects)[number];

  const sortById = (a: Project, b: Project) => {
    const aNum = Number(a.id.replace("p", ""));
    const bNum = Number(b.id.replace("p", ""));
    return aNum - bNum;
  };

  const estilo = $derived(() =>
    projects
      .filter((p) => p.category === "estilo_de_vida")
      .sort(sortById),
  );

  const grouped = $derived(() => {
    const map = new Map<string, Project[]>();

    for (const p of estilo()) {
      const key = p.mediumStyle ?? "Otros";

      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }

    return Array.from(map.entries()).map(([key, items]) => ({
      key,
      items,
    }));
  });
</script>

<main class="page">
  <h1>{style[$lang].title}</h1>

  <p class="page-intro">
    {#each style[$lang].intro as line, i}
      {line}
      {#if i !== style[$lang].intro.length - 1}
        <br />
      {/if}
    {/each}
  </p>

  {#each grouped() as group (group.key)}
    <section class="group">
      <h2 class="group-title">
        {group.key}
      </h2>

      <ul class="list">
        {#each group.items as project (project.id)}
          <li>
            <a
              class="link-underline"
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title[$lang]} ↗
            </a>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</main>
