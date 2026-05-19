import { infographics } from "$lib/data/infographics.data";

// Inferencia exacta del tipado base desde los datos crudos
export type Infographic = (typeof infographics)[number];

// Interfaz explícita para la estructura compatible con Treemaps
export interface MetricNode<K> {
  key: K;
  value: number;
}

export const countBy = <T, K extends PropertyKey>(
  items: readonly T[],
  getKey: (item: T) => K | null | undefined,
): MetricNode<K>[] => {
  const map = new Map<K, number>();

  for (const item of items) {
    const key = getKey(item);

    // Evita contar claves vacías, nulas o indefinidas de forma segura
    if (key === null || key === undefined || key === "") continue;

    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return Array.from(
    map,
    ([key, value]): MetricNode<K> => ({
      key,
      value,
    }),
  ).sort((a, b) => b.value - a.value);
};

export const getTreemapData = () => ({
  // Infieres automáticamente las subclaves exactas como string o tipos literales
  apartados: countBy(infographics, (project) => project.apartado),
  mediums: countBy(infographics, (project) => project.mediumKey),
});
