import { APARTADOS } from "$lib/config/apartados.config";
import type { InfographicRuntime, Lang } from "$lib/types/project.types";

export const createProjectView = (lang: Lang) => {
  const mediumLabel = (p: InfographicRuntime) => {
    return p.mediumKey ?? null;
  };

  const apartadoLabel = (p: InfographicRuntime) => {
    const key = p.apartado;
    if (key && key in APARTADOS) {
      return APARTADOS[key]?.label[lang] ?? null;
    }
    return null;
  };

  const title = (p: InfographicRuntime) => p.title[lang];

  const text = (t?: Record<string, string>) =>
    t ? (t[lang] ?? t.es ?? "") : "";

  return {
    mediumLabel,
    apartadoLabel,
    title,
    text,
  };
};
