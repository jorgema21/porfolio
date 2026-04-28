<script lang="ts">
  import projects from "$lib/data/projects";
  import { style } from "$lib/i18n/dictionaries/style.i18n";
  import { t, lang } from "$lib/i18n";

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
  <h1>{$t.style.title}</h1>

  <p class="page-intro">
    {#each $t.style.intro as node}
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
  </p>
  <p class="page-intro">
    {#each $t.style.description as node}
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
