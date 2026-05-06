export type SkillId =
  | "datawrapper"
  | "qgis"
  | "svelte"
  | "html-css"
  | "javascript";

export type Skill = {
  id: SkillId;
  logo?: string;
  level: number;
};

export const skills: Skill[] = [
  {
    id: "datawrapper",
    logo: "/images/logos/datawrapper.svg",
    level: 9,
  },
  {
    id: "qgis",
    logo: "/images/logos/qgis.svg",
    level: 6,
  },
  {
    id: "svelte",
    logo: "/images/logos/svelte.svg",
    level: 7,
  },
  {
    id: "html-css",
    logo: "/images/logos/html-css.svg",
    level: 8,
  },
  {
    id: "javascript",
    logo: "/images/logos/javascript.svg",
    level: 7,
  },
];