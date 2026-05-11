export type SkillId =
  | "datawrapper"
  | "qgis"
  | "svelte"
  | "code"
  | "flourish";

export type Skill = {
  id: SkillId;
  logo?: string;
  level: number;
};

export const skills: Skill[] = [
  {
    id: "datawrapper",
    logo: "/images/logos/DataWrapper-logo.png",
    level: 9,
  },
  {
    id: "qgis",
    logo: "/images/logos/QGIS-logo.png",
    level: 6,
  },
  {
    id: "svelte",
    logo: "/images/logos/Svelte-logo.png",
    level: 7,
  },
  {
    id: "code",
    logo: "/images/logos/code-logo.png",
    level: 8,
  },
  {
    id: "flourish",
    logo: "/images/logos/Flourish-logo.png",
    level: 7,
  },
];