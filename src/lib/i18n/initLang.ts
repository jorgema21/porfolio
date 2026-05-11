import { browser } from "$app/environment";
import { lang } from "$lib/i18n/lang";
import type { Lang } from "$lib/i18n/lang";

export function initLang() {
  if (!browser) return;

  const saved = localStorage.getItem("lang");

  if (saved === "es" || saved === "en") {
    lang.set(saved);
    return;
  }

  const detected: Lang = navigator.language.startsWith("es") ? "es" : "en";

  lang.set(detected);
  localStorage.setItem("lang", detected);
}