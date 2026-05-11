import { derived } from "svelte/store";
import { lang } from "./lang";
import { dictionaries } from "./dictionaries";

export const t = derived(lang, ($lang) => dictionaries[$lang]);

export { lang };

export function toggleLang() {
  lang.update((l) => (l === "es" ? "en" : "es"));
}