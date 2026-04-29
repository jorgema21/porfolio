<script lang="ts">
  import projects from "$lib/data/projects";
  import { t, lang } from "$lib/i18n";
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  type Project = (typeof projects)[number];

  // 🔢 ordenar por id numérico
  const sortById = (a: Project, b: Project) => {
    const aNum = Number(a.id.replace("p", ""));
    const bNum = Number(b.id.replace("p", ""));
    return aNum - bNum;
  };

  // 📦 filtrar + ordenar
  const estilo = $derived(() =>
    projects
      .filter((p) => p.category === "estilo_de_vida")
      .sort(sortById)
  );

  // 📊 agrupar por medio
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

  // 🔽 acordeón
  let openGroup = $state<string | null>(null);

  function toggleGroup(key: string) {
    openGroup = openGroup === key ? null : key;
  }
</script>

<main class="page">
  <h1>{$t.style.title}</h1>

  <!-- intro -->
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

  <!-- description -->
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

  <!-- acordeón -->
  {#each grouped() as group (group.key)}
    <section class="group">
      <button
        class="group-toggle"
        onclick={() => toggleGroup(group.key)}
        aria-expanded={openGroup === group.key}
      >
        <span>{group.key}</span>
        <span class="chevron">
          {openGroup === group.key ? "−" : "+"}
        </span>
      </button>

      {#if openGroup === group.key}
        <ul
          class="list"
          transition:slide={{ duration: 250, easing: cubicOut }}
        >
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
      {/if}
    </section>
  {/each}
</main>