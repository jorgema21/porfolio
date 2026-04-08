import { derived } from "svelte/store";
import { lang } from "./lang";

import { layout } from "./dictionaries/layout";
import { about } from "./dictionaries/about";
import { contact } from "./dictionaries/contact";
import { metaarticle } from "./dictionaries/meta-article";

export const dictionaries = derived(lang, ($lang) => ({
  layout: layout[$lang],
  about: about[$lang],
  contact: contact[$lang],
  metaarticle: metaarticle[$lang],
}));