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
  lightness = 55,
  darkLightness = 70,
  order = 0,
): ApartadoConfig => ({
  label,

  color: {
    light: `oklch(${lightness}% ${chroma} ${hue})`,
    dark: `oklch(${darkLightness}% ${chroma * 0.9} ${hue})`,
  },

  order,
});

export const APARTADOS = {
  sports: createApartado(
    {
      es: "Deportes",
      en: "Sports",
    },
    25,
    0.22,
    55,
    70,
    1,
  ),

  culture: createApartado(
    {
      es: "Cultura",
      en: "Culture",
    },
    310,
    0.18,
    60,
    75,
    2,
  ),

  genero: createApartado(
    {
      es: "Género",
      en: "Gender",
    },
    340,
    0.18,
    65,
    78,
    3,
  ),

  environment: createApartado(
    {
      es: "Medio Ambiente",
      en: "Environment",
    },
    145,
    0.18,
    55,
    70,
    4,
  ),

  economia: createApartado(
    {
      es: "Economía",
      en: "Economy",
    },
    85,
    0.15,
    60,
    75,
    5,
  ),

  nacional: createApartado(
    {
      es: "Nacional",
      en: "National",
    },
    250,
    0.18,
    55,
    70,
    6,
  ),

  internacional: createApartado(
    {
      es: "Internacional",
      en: "International",
    },
    180,
    0.08,
    55,
    70,
    7,
  ),
} satisfies Record<string, ApartadoConfig>;

export type ApartadoKey = keyof typeof APARTADOS;
