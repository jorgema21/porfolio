import { layout } from "./dictionaries/layout";
import { about } from "./dictionaries/about";
import { contact } from "./dictionaries/contact";
import { metaarticle } from "./dictionaries/meta-article";
import { infographics } from "./dictionaries/infographics.i18n";
import { style } from "./dictionaries/style.i18n";
import { motherhood } from "./dictionaries/motherhood";
import { project } from "./dictionaries/project";
import { home } from "./dictionaries/home";

import { apartados } from "./dictionaries/apartados";

import { timeline } from "./dictionaries/about/timeline";
import { skills } from "./dictionaries/about/skills";
import { languages } from "./dictionaries/about/languages";

export const dictionaries = {
  es: {
    layout: layout.es,
    about: about.es,
    contact: contact.es,
    metaarticle: metaarticle.es,
    infographics: infographics.es,
    motherhood: motherhood.es,
    style: style.es,
    project: project.es,
    apartados: apartados.es, // 👈
    home: home.es, // 👈
    timeline: timeline.es, // 👈
    skills: skills.es, // 👈
    languages: languages.es, // 👈
  },
  en: {
    layout: layout.en,
    about: about.en,
    contact: contact.en,
    metaarticle: metaarticle.en,
    infographics: infographics.en,
    motherhood: motherhood.en,
    style: style.en,
    project: project.en,
    apartados: apartados.en, // 👈
    home: home.en,
    timeline: timeline.en, // 👈
    skills: skills.en, // 👈
    languages: languages.en, // 👈
  },
} as const;
