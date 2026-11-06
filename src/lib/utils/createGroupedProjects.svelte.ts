import projects from "#lib/data/projects.js";
import type {
  ProjectCategory,
  ProjectContent,
} from "#lib/types/project.types.js";

function getPublicationDate(project: ProjectContent): string {
  return project.externalUrl?.match(/\/(\d{4}-\d{2}-\d{2})\//)?.[1] ?? "";
}

function sortByPublicationDate(a: ProjectContent, b: ProjectContent): number {
  const dateA = getPublicationDate(a);
  const dateB = getPublicationDate(b);

  if (dateA !== dateB) {
    return dateB.localeCompare(dateA);
  }

  return Number(a.id.slice(1)) - Number(b.id.slice(1));
}

export function createGroupedProjects(
  category: ProjectCategory,
  fallbackLabel: string,
) {
  const groupedResult = $derived.by(() => {
    const filtered = projects
      .filter((p) => p.category === category)
      .sort(sortByPublicationDate);

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
