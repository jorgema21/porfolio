import type { Lang } from "$lib/types/project.types";

const formatters = {
  es: new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  en: new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
};

export function formatDate(date: string, lang: Lang): string {
  if (!date) return "";
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return date;

  return formatters[lang].format(d);
}
