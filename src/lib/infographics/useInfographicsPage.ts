import { APARTADOS } from "$lib/config/apartados.config";
import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
import { getTreemapData } from "$lib/infographics/infographics.metrics";
import { createInfographicsState } from "$lib/infographics/infographics.state.svelte";

type ApartadoKey = keyof typeof APARTADOS;

export const useInfographicsPage = (
  lang: () => "es" | "en",
  t: any
) => {
  const { filters, filtered, grouped } =
    createInfographicsState(lang);

  const treemap = getTreemapData();

  const mediumDict = () => infographicsI18n[lang()].mediums;

  /* =========================
     SAFE LABEL APARTADO
  ========================= */

  const labelApartado = (k: string) => {
    if (k in APARTADOS) {
      return APARTADOS[k as ApartadoKey].label[lang()];
    }
    return k; // fallback seguro
  };

  const labelMedium = (k: string) =>
    mediumDict()[k] ?? k;

  const groupLabel = (key: string, type: "medium" | "apartado") =>
    type === "medium"
      ? labelMedium(key)
      : labelApartado(key);

  const sortOptions = [
    { value: "date", label: t.infographics.sort.newest },
    { value: "title", label: t.infographics.sort.title },
    { value: "apartado", label: t.infographics.sort.section },
    { value: "medium", label: t.infographics.sort.medium },
  ] as const;

  const renderNode = (node: any) => {
    if (typeof node === "string") return node;
    if (node.bold) return node.text;
    if (node.italic) return node.text;
    return node.text;
  };

  return {
    filters,
    filtered,
    grouped,
    treemap,
    mediumDict,
    labelApartado,
    labelMedium,
    groupLabel,
    sortOptions,
    renderNode,
  };
};