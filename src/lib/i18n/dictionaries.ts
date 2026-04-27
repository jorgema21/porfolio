import { layout } from "./dictionaries/layout";
import { about } from "./dictionaries/about";
import { contact } from "./dictionaries/contact";
import { metaarticle } from "./dictionaries/meta-article";
import { infographics } from "./dictionaries/infographics.i18n";
import { project } from "./dictionaries/project";
import { home } from "./dictionaries/home";

import { apartados } from "./dictionaries/apartados";

export const dictionaries = {
  es: {
    layout: layout.es,
    about: about.es,
    contact: contact.es,
    metaarticle: metaarticle.es,
    infographics: infographics.es,
    project: project.es,
    apartados: apartados.es, // 👈
    home: home.es, // 👈
  },
  en: {
    layout: layout.en,
    about: about.en,
    contact: contact.en,
    metaarticle: metaarticle.en,
    infographics: infographics.en,
    project: project.en,
    apartados: apartados.en, // 👈
    home: home.en,
  },
} as const;
