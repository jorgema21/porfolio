import { APARTADOS } from "$lib/config/apartados.config";
import { infographics as infographicsI18n } from "$lib/i18n/dictionaries/infographics.i18n";
import { getTreemapData } from "$lib/infographics/infographics.metrics";
import { createInfographicsState } from "$lib/infographics/infographics.state.svelte";

type ApartadoKey = keyof typeof APARTADOS;

export const useInfographicsPage = (lang: () => "es" | "en") => {
  // 1. NO desestructuramos filtered ni grouped aquí,
  // ya que son getters y se quedarían "congelados".
  const state = createInfographicsState(lang);

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

  // Tipo estricto para evitar el uso de 'any'
  type RichTextNode =
    | string
    | { text: string; bold?: boolean; italic?: boolean };

  const renderNode = (node: RichTextNode) => {
    // 1. Si es un string, es el camino correcto más común
    if (typeof node === "string") return node;

    // 2. Si es el objeto esperado, procesamos sus formatos
    if (node && typeof node === "object" && "text" in node) {
      if (node.bold) return node.text;
      if (node.italic) return node.text;
      return node.text;
    }

    // 3. CAMINO DE ERROR: Los datos están corruptos.
    // La web no se rompe (devuelve vacío), pero te avisa en la consola del desarrollador.
    console.error("⚠️ Estructura de nodo RichText inválida:", node);
    return "";
  };

  return {
    // 2. Devolvemos filters directamente (es un objeto reactivo)
    filters: state.filters,

    // 3. Devolvemos getters para filtered y grouped para mantener el puente reactivo
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
