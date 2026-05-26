type LocaleLabel = {
  es: string;
  en: string;
};

type ApartadoConfig = {
  label: LocaleLabel;
  color: {
    light: string;
    dark: string;
  };
  order: number;
};

const createApartado = (
  label: LocaleLabel,
  hue: number,
  chroma: number,
  options: { lightness?: number; darkLightness?: number; order?: number } = {},
): ApartadoConfig => {
  const { lightness = 52, darkLightness = 72, order = 999 } = options;
  return {
    label,
    color: {
      light: `oklch(${lightness}% ${chroma} ${hue})`,
      dark: `oklch(${darkLightness}% ${chroma * 0.9} ${hue})`,
    },
    order,
  };
};

export const APARTADOS = {
  sports: createApartado({ es: "Deportes", en: "Sports" }, 25, 0.22, {
    order: 1,
  }),
  culture: createApartado({ es: "Cultura", en: "Culture" }, 300, 0.18, {
    lightness: 53,
    darkLightness: 75,
    order: 2,
  }),
  gender: createApartado({ es: "Género", en: "Gender" }, 325, 0.2, {
    lightness: 54,
    darkLightness: 76,
    order: 3,
  }),
  environment: createApartado(
    { es: "Medio Ambiente", en: "Climate" },
    145,
    0.18,
    { order: 4 },
  ),
  economy: createApartado({ es: "Economía", en: "Economy" }, 85, 0.14, {
    lightness: 50,
    darkLightness: 75,
    order: 5,
  }),
  national: createApartado({ es: "Nacional", en: "National" }, 250, 0.18, {
    order: 6,
  }),
  international: createApartado(
    { es: "Internacional", en: "World" },
    195,
    0.08,
    { order: 7 },
  ),
  local: createApartado({ es: "Local", en: "Local" }, 120, 0.12, {
    order: 8,
  }),
  miscellaneous: createApartado({ es: "Miscelánea", en: "Features" }, 0, 0, {
    lightness: 60,
    darkLightness: 80,
    order: 9,
  }),
} satisfies Record<string, ApartadoConfig>;

export type ApartadoKey = keyof typeof APARTADOS;
