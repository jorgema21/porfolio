
import type { ProjectCategory, ProjectVariant } from './projects.js';

type HomeSlotDefinition = {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  variant: ProjectVariant;
  
  categories: readonly ProjectCategory[];
};

export const homeSlots = {
  A1: { colStart: 1, colSpan: 8, rowStart: 1, rowSpan: 3, variant: 'hero', categories: ['infografia'] },
  A2: { colStart: 9, colSpan: 4, rowStart: 1, rowSpan: 1, variant: 'list', categories: ['estilo_de_vida'] },
  A3: { colStart: 9, colSpan: 4, rowStart: 2, rowSpan: 1, variant: 'list', categories: ['estilo_de_vida'] },
  A4: { colStart: 9, colSpan: 4, rowStart: 3, rowSpan: 1, variant: 'list', categories: ['maternidad'] },

  B1: { colStart: 1, colSpan: 4, rowStart: 5, rowSpan: 1, variant: 'grid', categories: ['infografia'] },
  B2: { colStart: 5, colSpan: 4, rowStart: 5, rowSpan: 1, variant: 'grid', categories: ['infografia'] },
  B3: { colStart: 9, colSpan: 4, rowStart: 5, rowSpan: 1, variant: 'grid', categories: ['infografia'] },

  C1: { colStart: 1, colSpan: 12, rowStart: 7, rowSpan: 1, variant: 'feature', categories: ['infografia'] },
  C2: { colStart: 1, colSpan: 12, rowStart: 8, rowSpan: 1, variant: 'feature', categories: ['infografia'] },

  D1: { colStart: 1, colSpan: 4, rowStart: 10, rowSpan: 1, variant: 'grid', categories: ['infografia'] },
  D2: { colStart: 5, colSpan: 4, rowStart: 10, rowSpan: 1, variant: 'grid', categories: ['infografia'] },
  D3: { colStart: 9, colSpan: 4, rowStart: 10, rowSpan: 1, variant: 'grid', categories: ['infografia'] },

  E1: { colStart: 1, colSpan: 4, rowStart: 12, rowSpan: 1, variant: 'list', categories: ['maternidad'] },
  E2: { colStart: 1, colSpan: 4, rowStart: 13, rowSpan: 1, variant: 'list', categories: ['estilo_de_vida'] },
  E3: { colStart: 1, colSpan: 4, rowStart: 14, rowSpan: 1, variant: 'list', categories: ['estilo_de_vida'] },
  E4: { colStart: 5, colSpan: 8, rowStart: 12, rowSpan: 3, variant: 'hero', categories: ['infografia'] },
} as const satisfies Record<string, HomeSlotDefinition>;

export type HomeSlotKey = keyof typeof homeSlots;
