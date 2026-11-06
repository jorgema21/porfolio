import type { HomeSlotKey } from "./home-slots.js";

import type {
  ProjectCategory,
  ProjectVariant,
  ProjectContent,
  TranslatedText,
} from "#lib/types/project.types.js";

export type { ProjectCategory, ProjectVariant };

export type ProjectTitle = TranslatedText;

export interface HomeProject extends ProjectContent {
  homeSlot?: HomeSlotKey;
  featured?: boolean;
}

import { infographicProjects } from "./projects/infographics.js";
import { lifestyleProjects } from "./projects/lifestyle.js";
import { parentingProjects } from "./projects/parenting.js";

const projects: HomeProject[] = [
  ...infographicProjects,
  ...lifestyleProjects,
  ...parentingProjects,
];

export default projects;
