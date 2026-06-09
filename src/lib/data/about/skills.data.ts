export type SkillId =
  | "datawrapper"
  | "flourish"
  | "illustrator"
  | "googlesheets"
  | "photoshop"
  | "rstudio"
  | "premiere"
  | "rstudio"
  | "code"
  | "svelte"
  | "qgis"
  | "blender"
  | "aftereffects";

export type Skill = {
  id: SkillId;
  logo?: string;
  level: number;
};

const rawSkills: Skill[] = [
  {
    id: "datawrapper",
    logo: "/images/logos/DataWrapper-logo.png",
    level: 8,
  },
  {
    id: "flourish",
    logo: "/images/logos/Flourish-logo.png",
    level: 6,
  },
  {
    id: "illustrator",
    logo: "/images/logos/Illustrator-logo.png",
    level: 7,
  },
  {
    id: "googlesheets",
    logo: "/images/logos/GoogleSheets-logo.png",
    level: 7,
  },
  {
    id: "photoshop",
    logo: "/images/logos/Photoshop-logo.png",
    level: 3,
  },
  {
    id: "rstudio",
    logo: "/images/logos/RStudio-logo.png",
    level: 5,
  },
  {
    id: "premiere",
    logo: "/images/logos/Premiere-logo.png",
    level: 3,
  },
  {
    id: "code",
    logo: "/images/logos/code-logo.png",
    level: 5,
  },
  {
    id: "svelte",
    logo: "/images/logos/Svelte-logo.png",
    level: 5,
  },
  {
    id: "qgis",
    logo: "/images/logos/QGIS-logo.png",
    level: 4,
  },
  {
    id: "blender",
    logo: "/images/logos/Blender-logo.png",
    level: 2,
  },
  {
    id: "aftereffects",
    logo: "/images/logos/AfterEffects-logo.png",
    level: 1,
  },
];

export const skills: Skill[] = [...rawSkills].sort((a, b) => b.level - a.level);
