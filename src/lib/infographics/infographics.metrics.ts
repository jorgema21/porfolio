import { infographics } from "$lib/data/infographics.data";

export type Infographic = (typeof infographics)[number];

export const countBy = <T, K extends PropertyKey>(
  items: T[],
  getKey: (item: T) => K | null | undefined
) => {
  const map = new Map<K, number>();

  for (const item of items) {
    const key = getKey(item);
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return [...map.entries()]
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value);
};

export const getTreemapData = () => ({
  apartados: countBy(infographics, (p) => p.apartado),
  mediums: countBy(infographics, (p) => p.mediumKey),
});