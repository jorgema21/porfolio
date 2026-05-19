import projects from "$lib/data/projects";
import type { ProjectCategory, ProjectContent } from "$lib/types/project.types";

export function createGroupedProjects(
  category: ProjectCategory,
  fallbackLabel: string,
) {

  const sortById = (a: ProjectContent, b: ProjectContent) =>
    Number(a.id.slice(1)) - Number(b.id.slice(1));

  const groupedResult = $derived.by(() => {
    const filtered = projects
      .filter((p) => p.category === category)
      .sort(sortById);

    const map = new Map<string, ProjectContent[]>();

    for (const project of filtered) {
      const key = project.mediumStyle ?? fallbackLabel;
      
      let group = map.get(key);
      if (!group) {
        group = [];
        map.set(key, group);
      }
      group.push(project);
    }

    return Array.from(map, ([key, items]) => ({ key, items }));
  });

  return {
    get grouped() {
      return groupedResult;
    }
  };
}
