import { writable } from "svelte/store";

export type Lang = "es" | "en";

export const lang = writable<Lang>("es");

export const toggleLang = () => {
  lang.update((l) => (l === "es" ? "en" : "es"));
};