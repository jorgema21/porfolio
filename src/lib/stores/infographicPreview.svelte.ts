import type { Infographic } from "$lib/data/infographics.data";

type PreviewState = {
  project: Infographic | null;
};

export const preview = $state<PreviewState>({
  project: null
});

export const openPreview = (project: Infographic) => {
  preview.project = project;
};

export const closePreview = () => {
  preview.project = null;
};