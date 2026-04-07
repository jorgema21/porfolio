import { writable } from "svelte/store";
import type { Lang } from "$lib/i18n/types";

export const lang = writable<Lang>("es");

export function toggleLang() {
  lang.update((l) => {
    const next: Lang = l === "es" ? "en" : "es";
    localStorage.setItem("lang", next);
    return next;
  });
}