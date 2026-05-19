import { APARTADOS } from "$lib/config/apartados.config";
import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
import { getTreemapData } from "./infographics.metrics";
import { createInfographicsState } from "./infographics.state.svelte";
type ApartadoKey = keyof typeof APARTADOS;
export const useInfographicsPage = (lang: () => "es" | "en") => {
  const state = createInfographicsState(lang);
  const treemap = getTreemapData();
  const mediumDict = () => infographicsI18n[lang()].mediums;
  const labelApartado = (k: string) => {
    if (k in APARTADOS) {
      return APARTADOS[k as ApartadoKey].label[lang()];
    }
    return k;
  };
  const labelMedium = (k: string) => mediumDict()[k] ?? k;
  const groupLabel = (key: string, type: "medium" | "apartado") =>
    type === "medium" ? labelMedium(key) : labelApartado(key);
  const sortOptions = [
    { value: "date", key: "newest" },
    { value: "title", key: "title" },
    { value: "apartado", key: "section" },
    { value: "medium", key: "medium" },
  ] as const satisfies readonly {
    value: string;
    key: keyof typeof infographicsI18n.es.sort;
  }[];
  type RichTextNode =
    | string
    | { text: string; bold?: boolean; italic?: boolean };
  const renderNode = (node: RichTextNode) => {
    if (typeof node === "string") return node;
    if (node && typeof node === "object" && "text" in node) return node.text;
    console.error("⚠️ Estructura de nodo RichText inválida:", node);
    return "";
  };

  return {
    filters: state.filters,
    get filtered() {
      return state.filtered;
    },
    get grouped() {
      return state.grouped;
    },

    treemap,
    mediumDict,
    labelApartado,
    labelMedium,
    groupLabel,
    sortOptions,
    renderNode,
  };
};
