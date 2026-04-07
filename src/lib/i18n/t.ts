import { derived } from "svelte/store";
import { lang } from "$lib/i18n/lang";
import { dictionaries } from "$lib/i18n/dictionaries";

export const t = derived(lang, ($lang) => {
  return dictionaries[$lang];
});