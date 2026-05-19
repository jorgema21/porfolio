import { infographics } from "$lib/data/infographics.data";

export type Infographic = (typeof infographics)[number];

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
  apartados: countBy(infographics, (project) => project.apartado),
  mediums: countBy(infographics, (project) => project.mediumKey),
});
