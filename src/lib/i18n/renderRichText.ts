import type { RichText } from "./rich-text.types";

export function renderRichText(nodes: RichText) {
  return nodes.map((node) => {
    if (typeof node === "string") return node;

    let text = node.text;

    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;

    if (node.link) {
      text = `<a href="${node.link}">${text}</a>`;
    }

    return text;
  }).join("");
}