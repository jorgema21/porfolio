let image = $state<string | null>(null);

export function openLightbox(src: string) {
  image = src;
}

export function closeLightbox() {
  image = null;
}

export const lightbox = {
  get image() {
    return image;
  }
};