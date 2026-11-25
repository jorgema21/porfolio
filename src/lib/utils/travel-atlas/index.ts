import type {
  AtlasArticle,
  AtlasArticlePlace,
  AtlasArticleStatus,
  AtlasDataset,
  AtlasPlace,
  AtlasPlaceType,
  AtlasRelevance,
} from "#lib/types/travel-atlas.types.js";

import type { TranslatedText } from "#lib/types/project.types.js";

export type AtlasFilter = "all" | "substantial";

export interface AtlasIndex {
  articles: ReadonlyMap<string, AtlasArticle>;
  places: ReadonlyMap<string, AtlasPlace>;
  children: ReadonlyMap<string | null, readonly AtlasPlace[]>;
  shortTitles: ReadonlyMap<string, TranslatedText>;
  relations: readonly AtlasArticlePlace[];
  articleStatuses: ReadonlyMap<string, AtlasArticleStatus>;
  nonGeographicArticleIds: readonly string[];
}

export interface AtlasArticleMatch {
  article: AtlasArticle;
  title: TranslatedText;

  relations: AtlasArticlePlace[];

  isDirect: boolean;
}

export interface AtlasCoverage {
  placeCount: number;
  articleCount: number;
  countryCount: number;
  articles: AtlasArticleMatch[];
}

const relevanceOrder: Record<AtlasRelevance, number> = {
  protagonist: 0,
  detailed: 1,
  mention: 2,
};

function uniqueById<T extends { id: string }>(
  items: readonly T[],
  label: string,
): Map<string, T> {
  const result = new Map<string, T>();

  for (const item of items) {
    if (result.has(item.id)) {
      throw new Error(`Atlas: ${label} duplicado: "${item.id}".`);
    }

    result.set(item.id, item);
  }

  return result;
}
const hierarchyLevel: Record<AtlasPlaceType, number> = {
  country: 0,
  region: 1,
  province: 2,
  municipality: 3,
};

function validateHierarchy(places: ReadonlyMap<string, AtlasPlace>): void {
  for (const place of places.values()) {
    const visited = new Set<string>();
    let current: AtlasPlace | undefined = place;

    while (current) {
      if (visited.has(current.id)) {
        throw new Error(`Atlas: ciclo en la jerarquía de "${place.id}".`);
      }

      visited.add(current.id);

      if (current.parentId === null) {
        if (current.type !== "country") {
          throw new Error(
            `Atlas: "${current.id}" debe tener un territorio padre.`,
          );
        }

        break;
      }

      if (current.type === "country") {
        throw new Error(`Atlas: el país "${current.id}" debe ser una raíz.`);
      }

      const parent = places.get(current.parentId);

      if (!parent) {
        throw new Error(
          `Atlas: padre inexistente "${current.parentId}" en "${current.id}".`,
        );
      }

      if (hierarchyLevel[parent.type] >= hierarchyLevel[current.type]) {
        throw new Error(
          `Atlas: jerarquía inválida entre "${parent.id}" (${parent.type}) y "${current.id}" (${current.type}).`,
        );
      }

      current = parent;
    }

    const [longitude, latitude] = place.coordinates;

    if (
      !Number.isFinite(longitude) ||
      !Number.isFinite(latitude) ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      throw new Error(`Atlas: coordenadas inválidas en "${place.id}".`);
    }
  }
}

export function createAtlasIndex(
  dataset: AtlasDataset,
  sourceArticles: readonly AtlasArticle[],
): AtlasIndex {
  const articles = uniqueById(sourceArticles, "artículo");
  const places = uniqueById(dataset.places, "lugar");

  validateHierarchy(places);

  const children = new Map<string | null, AtlasPlace[]>();

  for (const place of places.values()) {
    const siblings = children.get(place.parentId) ?? [];
    siblings.push(place);
    children.set(place.parentId, siblings);
  }

  const relationKeys = new Set<string>();
  const geographicArticleIds = new Set<string>();

  for (const relation of dataset.relations) {
    if (!articles.has(relation.articleId)) {
      throw new Error(`Atlas: artículo inexistente "${relation.articleId}".`);
    }

    if (!places.has(relation.placeId)) {
      throw new Error(`Atlas: lugar inexistente "${relation.placeId}".`);
    }

    const key = JSON.stringify([relation.articleId, relation.placeId]);

    if (relationKeys.has(key)) {
      throw new Error(
        `Atlas: relación duplicada entre "${relation.articleId}" y "${relation.placeId}".`,
      );
    }

    relationKeys.add(key);
    geographicArticleIds.add(relation.articleId);
  }

  const shortTitles = new Map<string, TranslatedText>();
  const overrideIds = new Set<string>();

  for (const override of dataset.articleOverrides) {
    if (!articles.has(override.articleId)) {
      throw new Error(
        `Atlas: ajuste para un artículo inexistente "${override.articleId}".`,
      );
    }

    if (overrideIds.has(override.articleId)) {
      throw new Error(
        `Atlas: ajustes duplicados para "${override.articleId}".`,
      );
    }

    overrideIds.add(override.articleId);

    if (override.shortTitle) {
      shortTitles.set(override.articleId, override.shortTitle);
    }
  }

  const nonGeographicIds = new Set<string>();

  for (const articleId of dataset.nonGeographicArticleIds) {
    if (!articles.has(articleId)) {
      throw new Error(
        `Atlas: artículo sin destino inexistente "${articleId}".`,
      );
    }

    if (nonGeographicIds.has(articleId)) {
      throw new Error(`Atlas: artículo sin destino duplicado "${articleId}".`);
    }

    if (geographicArticleIds.has(articleId)) {
      throw new Error(
        `Atlas: "${articleId}" figura sin destino, pero tiene lugares asociados.`,
      );
    }

    nonGeographicIds.add(articleId);
  }

  const articleStatuses = new Map<string, AtlasArticleStatus>();

  for (const articleId of articles.keys()) {
    const status: AtlasArticleStatus = geographicArticleIds.has(articleId)
      ? "geographic"
      : nonGeographicIds.has(articleId)
        ? "nonGeographic"
        : "pending";

    articleStatuses.set(articleId, status);
  }

  return {
    articles,
    places,
    children,
    shortTitles,
    relations: dataset.relations,
    articleStatuses,
    nonGeographicArticleIds: [...nonGeographicIds],
  };
}

export function getAtlasPath(index: AtlasIndex, placeId: string): AtlasPlace[] {
  const path: AtlasPlace[] = [];
  let current = index.places.get(placeId);

  if (!current) {
    throw new Error(`Atlas: lugar desconocido "${placeId}".`);
  }

  while (current) {
    path.push(current);

    current =
      current.parentId === null
        ? undefined
        : index.places.get(current.parentId);
  }

  return path.reverse();
}

function getBranchIds(index: AtlasIndex, placeId: string | null): Set<string> {
  if (placeId === null) {
    return new Set(index.places.keys());
  }

  if (!index.places.has(placeId)) {
    throw new Error(`Atlas: lugar desconocido "${placeId}".`);
  }

  const result = new Set<string>();
  const pending = [placeId];

  while (pending.length > 0) {
    const currentId = pending.pop();

    if (currentId === undefined || result.has(currentId)) {
      continue;
    }

    result.add(currentId);

    for (const child of index.children.get(currentId) ?? []) {
      pending.push(child.id);
    }
  }

  return result;
}

function matchesFilter(
  relation: AtlasArticlePlace,
  filter: AtlasFilter,
): boolean {
  return filter === "all" || relation.relevance !== "mention";
}

function bestRelevance(relations: readonly AtlasArticlePlace[]): number {
  return relations.reduce(
    (best, relation) => Math.min(best, relevanceOrder[relation.relevance]),
    Number.POSITIVE_INFINITY,
  );
}

function publicationTime(article: AtlasArticle): number {
  if (!article.publishedAt) return 0;

  const timestamp = Date.parse(article.publishedAt);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function getAtlasCoverage(
  index: AtlasIndex,
  filter: AtlasFilter = "all",
  placeId: string | null = null,
): AtlasCoverage {
  const branchIds = getBranchIds(index, placeId);

  const matchingRelations = index.relations.filter(
    (relation) =>
      branchIds.has(relation.placeId) && matchesFilter(relation, filter),
  );

  const placeIds = [
    ...new Set(matchingRelations.map((relation) => relation.placeId)),
  ];

  const countryIds = new Set<string>();

  for (const id of placeIds) {
    const country = getAtlasPath(index, id)[0];

    if (country) {
      countryIds.add(country.id);
    }
  }

  const relationsByArticle = new Map<string, AtlasArticlePlace[]>();

  for (const relation of matchingRelations) {
    const relations = relationsByArticle.get(relation.articleId) ?? [];
    relations.push(relation);
    relationsByArticle.set(relation.articleId, relations);
  }

  const articles: AtlasArticleMatch[] = [];

  for (const [articleId, relations] of relationsByArticle) {
    const article = index.articles.get(articleId);

    if (!article) {
      throw new Error(`Atlas: artículo desconocido "${articleId}".`);
    }

    articles.push({
      article,
      title: index.shortTitles.get(articleId) ?? article.title,
      relations,
      isDirect:
        placeId !== null &&
        relations.some((relation) => relation.placeId === placeId),
    });
  }

  articles.sort((a, b) => {
    if (a.isDirect !== b.isDirect) {
      return a.isDirect ? -1 : 1;
    }

    const aRelations = a.isDirect
      ? a.relations.filter((relation) => relation.placeId === placeId)
      : a.relations;

    const bRelations = b.isDirect
      ? b.relations.filter((relation) => relation.placeId === placeId)
      : b.relations;

    const relevanceDifference =
      bestRelevance(aRelations) - bestRelevance(bRelations);

    if (relevanceDifference !== 0) {
      return relevanceDifference;
    }

    return (
      publicationTime(b.article) - publicationTime(a.article) ||
      a.article.id.localeCompare(b.article.id)
    );
  });

  return {
    placeCount: placeIds.length,
    articleCount: articles.length,
    countryCount: countryIds.size,
    articles,
  };
}
