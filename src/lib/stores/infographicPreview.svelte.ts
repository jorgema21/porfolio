import type { Infographic } from "$lib/data/infographics.data";

type PreviewState = {
  project: Infographic | null;
};

export const preview = $state<PreviewState>({
  project: null
});

export function openPreview(project: Infographic) {
  preview.project = project;
}

export function closePreview() {
  preview.project = null;
}