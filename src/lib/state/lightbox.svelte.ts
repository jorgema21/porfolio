let currentImage = $state<string | null>(null);

export const openLightbox = (src: string) => {
  currentImage = src;
};

export const closeLightbox = () => {
  currentImage = null;
};

export const lightbox = {
  get image() {
    return currentImage;
  },
};
