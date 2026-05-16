import projects from "$lib/data/projects";

type Project = (typeof projects)[number];

export function createGroupedProjects(
  category: Project["category"],
  fallbackLabel: string,
) {
  const sortById = (a: Project, b: Project) =>
    Number(a.id.slice(1)) - Number(b.id.slice(1));

  const filtered = () =>
    projects.filter((p) => p.category === category).sort(sortById);

  const grouped = () => {
    const map = new Map<string, Project[]>();

    for (const project of filtered()) {
      const key = project.mediumStyle ?? fallbackLabel;

      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(project);
    }

    return Array.from(map, ([key, items]) => ({
      key,
      items,
    }));
  };

  return { grouped };
}
