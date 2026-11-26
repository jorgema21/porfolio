import type { ProjectContent, TranslatedText } from "./project.types.js";

export type AtlasPlaceType = "country" | "region" | "province" | "municipality";

export type AtlasRelevance = "protagonist" | "detailed" | "mention";

export type AtlasArticleStatus = "geographic" | "nonGeographic" | "pending";

export type AtlasCoordinates = readonly [longitude: number, latitude: number];

export interface AtlasPlace {
  id: string;
  name: TranslatedText;
  type: AtlasPlaceType;
  parentId: string | null;
  coordinates: AtlasCoordinates;
  boundaryId?: string;
  illustration?: string;
}

export interface AtlasArticlePlace {
  articleId: string;
  placeId: string;
  relevance: AtlasRelevance;
}

export interface AtlasArticleOverride {
  articleId: string;
  shortTitle?: TranslatedText;
}

export interface AtlasDataset {
  places: readonly AtlasPlace[];
  relations: readonly AtlasArticlePlace[];
  articleOverrides: readonly AtlasArticleOverride[];
  nonGeographicArticleIds: readonly string[];
}

export type AtlasArticle = Pick<
  ProjectContent,
  "id" | "title" | "externalUrl" | "publishedAt" | "mediumStyle"
>;

export interface AtlasDonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
}
