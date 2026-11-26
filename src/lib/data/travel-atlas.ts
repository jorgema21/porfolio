import type { AtlasDataset } from "#lib/types/travel-atlas.types.js";

export const travelAtlasDataset: AtlasDataset = {
  places: [
    {
      id: "es",
      name: { es: "España", en: "Spain" },
      type: "country",
      parentId: null,
      coordinates: [-3.56, 40.37],
      boundaryId: "ESP",
    },
    {
      id: "es-cyl",
      name: { es: "Castilla y León", en: "Castile and León" },
      type: "region",
      parentId: "es",
      coordinates: [-4.76, 41.74],
      boundaryId: "ES.CL",
    },
    {
      id: "es-burgos-province",
      name: { es: "Burgos", en: "Burgos" },
      type: "province",
      parentId: "es-cyl",
      coordinates: [-3.42, 42.33],
      boundaryId: "ES-BU",
    },
    {
      id: "es-burgos-caleruega",
      name: { es: "Caleruega", en: "Caleruega" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.486451, 41.82459],
      illustration: "spain/caleruega.svg",
    },
    {
      id: "es-burgos-briviesca",
      name: { es: "Briviesca", en: "Briviesca" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.32315, 42.54993],
      illustration: "spain/briviesca.svg",
    },
    {
      id: "es-burgos-poza-de-la-sal",
      name: { es: "Poza de la Sal", en: "Poza de la Sal" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.5014, 42.66542],
      illustration: "spain/poza-de-la-sal.svg",
    },
    {
      id: "es-burgos-quintanabureba",
      name: { es: "Quintanabureba", en: "Quintanabureba" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.366316, 42.586767],
    },
    {
      id: "es-burgos-llano-de-bureba",
      name: { es: "Llano de Bureba", en: "Llano de Bureba" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.459297, 42.62436],
    },
    {
      id: "es-burgos-cilleruelo-de-arriba",
      name: { es: "Cilleruelo de Arriba", en: "Cilleruelo de Arriba" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.661674, 41.904822],
      illustration: "spain/cilleruelo-de-arriba.svg",
    },
    {
      id: "es-burgos-banos-de-valdearados",
      name: { es: "Baños de Valdearados", en: "Baños de Valdearados" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.555613, 41.770718],
      illustration: "spain/banos-de-valdearados.svg",
    },
    {
      id: "es-burgos-villanueva-de-gumiel",
      name: { es: "Villanueva de Gumiel", en: "Villanueva de Gumiel" },
      type: "municipality",
      parentId: "es-burgos-province",
      coordinates: [-3.62658, 41.73778],
    },
  ],

  relations: [
    {
      articleId: "viaj2",
      placeId: "es-burgos-caleruega",
      relevance: "detailed",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-briviesca",
      relevance: "detailed",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-poza-de-la-sal",
      relevance: "detailed",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-quintanabureba",
      relevance: "mention",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-llano-de-bureba",
      relevance: "mention",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-cilleruelo-de-arriba",
      relevance: "mention",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-banos-de-valdearados",
      relevance: "mention",
    },
    {
      articleId: "viaj2",
      placeId: "es-burgos-villanueva-de-gumiel",
      relevance: "mention",
    },
  ],

  articleOverrides: [],

  nonGeographicArticleIds: ["viaj1"],
};
