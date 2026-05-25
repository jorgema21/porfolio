import type { Infographic } from "$lib/data/infographics.data";

let currentProject = $state<Infographic | null>(null);

export const openPreview = (project: Infographic) => {
  currentProject = project;
};

export const closePreview = () => {
  currentProject = null;
};

export const preview = {
  get project() {
    return currentProject;
  },
};
