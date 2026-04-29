import { APARTADOS } from "$lib/config/apartados.config";
import { infographics as i18n } from "$lib/i18n/dictionaries/infographics.i18n";
import type { ProjectContent } from "$lib/types/project.types";

export const createProjectView = (lang: "es" | "en") => {
  const mediumLabel = (p: ProjectContent) =>
    p.mediumKey ? i18n[lang].mediums[p.mediumKey] ?? null : null;

  const apartadoLabel = (p: ProjectContent) =>
    p.apartado ? APARTADOS[p.apartado]?.label[lang] ?? null : null;

  const title = (p: ProjectContent) => p.title[lang];

  const text = (t?: Record<string, any>) =>
    t ? t[lang] ?? t.es ?? "" : "";

  return {
    mediumLabel,
    apartadoLabel,
    title,
    text,
  };
};