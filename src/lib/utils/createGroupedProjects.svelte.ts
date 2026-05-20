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

    const groups = Object.groupBy(
      filtered,
      (project) => project.mediumStyle ?? fallbackLabel,
    );

    return Object.entries(groups).map(([key, items]) => ({
      key,
      items: items ?? [],
    }));
  });

  return {
    get grouped() {
      return groupedResult;
    },
  };
}
