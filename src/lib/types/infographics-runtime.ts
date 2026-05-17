import type { Block } from "$lib/types/block";
import type { ProjectContent } from "$lib/types/project.types";
import type { InfographicMeta } from "$lib/data/infographics.data";

/**
 * Modelo real de ejecución (lo que realmente se renderiza en +page)
 */
export type InfographicRuntime = ProjectContent &
  InfographicMeta & {
    blocks: Block[];
  };