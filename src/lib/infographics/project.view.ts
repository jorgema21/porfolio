import { APARTADOS } from "$lib/config/apartados.config";
import type { ProjectContent } from "$lib/types/project.types";

export const createProjectView = (
  lang: "es" | "en",
) => {
  const mediumLabel = (
    p: ProjectContent,
  ) => p.medium?.[lang] ?? null;

  const apartadoLabel = (
    p: ProjectContent,
  ) =>
    p.apartado
      ? APARTADOS[p.apartado]?.label[lang] ??
        null
      : null;

  const title = (p: ProjectContent) =>
    p.title[lang];

  const text = (
    t?: Record<string, string>,
  ) => (t ? t[lang] ?? t.es ?? "" : "");

  return {
    mediumLabel,
    apartadoLabel,
    title,
    text,
  };
};