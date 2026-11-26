import type { AtlasDonutSegment } from "#lib/types/travel-atlas.types.js";

import { ATLAS_CENTER, ATLAS_VIEWBOX_SIZE } from "./globe/geometry.js";

export const ATLAS_DONUT_RADIUS = 140;

const circumference = 2 * Math.PI * ATLAS_DONUT_RADIUS;

export interface AtlasDonutArc extends AtlasDonutSegment {
  length: number;
  offset: number;
  textPath: string | null;
}

export interface AtlasDonutLayout {
  total: number;
  arcs: AtlasDonutArc[];
}

export function getAtlasDonutLabelFontSize(stageWidth: number): number {
  const targetLabelSize = Math.max(12, Math.min(16, stageWidth / 45));

  return Math.min(
    12,
    (targetLabelSize * ATLAS_VIEWBOX_SIZE) / (stageWidth || 560),
  );
}

function estimateTextWidth(value: string): number {
  return Array.from(value).reduce((width, character) => {
    if (character === " ") return width + 2.8;
    if ("ilIjtfr.,'".includes(character)) return width + 3;
    if ("MWmwÁÉÓÚÑÜ".includes(character)) return width + 8;

    return width + 5.5;
  }, 0);
}

function getCirclePoint(angle: number): string {
  const x = ATLAS_CENTER + Math.cos(angle) * ATLAS_DONUT_RADIUS;
  const y = ATLAS_CENTER + Math.sin(angle) * ATLAS_DONUT_RADIUS;

  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

function getTextPath(
  offset: number,
  length: number,
  name: string,
  labelFontSize: number,
): string | null {
  const available = Math.min(
    (circumference * length) / 100 - labelFontSize * 2,
    circumference / 2,
  );

  const textWidth = estimateTextWidth(name) * (labelFontSize / 10.4);

  if (textWidth + labelFontSize > available) return null;

  const midAngle = ((offset + length / 2) / 100) * Math.PI * 2 - Math.PI / 2;

  const halfAngle = available / (2 * ATLAS_DONUT_RADIUS);

  const bottomHalf = Math.sin(midAngle) > 0;

  const start = bottomHalf ? midAngle + halfAngle : midAngle - halfAngle;

  const end = bottomHalf ? midAngle - halfAngle : midAngle + halfAngle;

  return `M ${getCirclePoint(start)} A ${ATLAS_DONUT_RADIUS} ${ATLAS_DONUT_RADIUS} 0 0 ${bottomHalf ? 0 : 1} ${getCirclePoint(end)}`;
}

export function getAtlasDonutLayout(
  segments: readonly AtlasDonutSegment[],
  labelFontSize: number,
): AtlasDonutLayout {
  const positiveSegments = segments.filter(
    (segment) => Number.isFinite(segment.value) && segment.value > 0,
  );

  const total = positiveSegments.reduce(
    (sum, segment) => sum + segment.value,
    0,
  );

  let offset = 0;

  const arcs = positiveSegments.map((segment): AtlasDonutArc => {
    const length = (segment.value / total) * 100;

    const arc: AtlasDonutArc = {
      ...segment,
      length,
      offset,
      textPath: getTextPath(offset, length, segment.label, labelFontSize),
    };

    offset += length;

    return arc;
  });

  return { total, arcs };
}
