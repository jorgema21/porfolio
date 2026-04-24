import type { Lang } from "$lib/types/project.types";

export function formatDate(date: string, lang: Lang): string {
  const d = new Date(date);

  if (lang === "es") {
    const parts = new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).formatToParts(d);

    return `${parts.find((p) => p.type === "day")?.value} ${
      parts.find((p) => p.type === "month")?.value
    } ${parts.find((p) => p.type === "year")?.value}`;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(d);
}