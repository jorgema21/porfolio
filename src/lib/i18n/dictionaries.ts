import { derived } from "svelte/store";
import { lang } from "$lib/i18n/lang";

import { layout } from "./dictionaries/layout";
import { metaarticle } from "./dictionaries/meta-article";
import { about } from "./dictionaries/about";
import { contact } from "./dictionaries/contact";

export const t = derived(lang, ($lang) => ({
  layout: layout[$lang],
  metaarticle: metaarticle[$lang],
  about: about[$lang],
  contact: contact[$lang],
}));
