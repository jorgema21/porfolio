import { about } from "./dictionaries/about";
import { languages } from "./dictionaries/about/languages";
import { skills } from "./dictionaries/about/skills";
import { skillLevels } from "./dictionaries/about/skill-levels";
import { timeline } from "./dictionaries/about/timeline";
import { timelineUI } from "./dictionaries/about/timelineUI";
import { contact } from "./dictionaries/contact";
import { home } from "./dictionaries/home";
import { infographics } from "./dictionaries/infographics.i18n";
import { layout } from "./dictionaries/layout";
import { metaarticle } from "./dictionaries/meta-article";
import { motherhood } from "./dictionaries/motherhood";
import { project } from "./dictionaries/project";
import { style } from "./dictionaries/style.i18n";

export const dictionaries = {
  es: {
    about: about.es,
    contact: contact.es,
    home: home.es,
    infographics: infographics.es,
    languages: languages.es,
    layout: layout.es,
    metaarticle: metaarticle.es,
    motherhood: motherhood.es,
    project: project.es,
    skills: skills.es,
    skillLevels: skillLevels.es,
    style: style.es,
    timeline: timeline.es,
    timelineUI: timelineUI.es,
  },
  en: {
    about: about.en,
    contact: contact.en,
    home: home.en,
    infographics: infographics.en,
    languages: languages.en,
    layout: layout.en,
    metaarticle: metaarticle.en,
    motherhood: motherhood.en,
    project: project.en,
    skills: skills.en,
    skillLevels: skillLevels.en,
    style: style.en,
    timeline: timeline.en,
    timelineUI: timelineUI.en,
  },
} as const;

export type Dictionary = typeof dictionaries.es;
