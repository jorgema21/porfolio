export type Block =
  | { type: "hero"; src: string }
  | { type: "image"; src: string }
  | { type: "text"; content: string }
  | { type: "divider" };

export function parseProjectContent(raw: string): Block[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line): Block | null => {
      if (line.startsWith("hero:"))
        return { type: "hero", src: line.slice(5).trim() };

      if (line.startsWith("image:"))
        return { type: "image", src: line.slice(6).trim() };

      if (line.startsWith("text:"))
        return { type: "text", content: line.slice(5).trim() };

      if (line.startsWith("divider"))
        return { type: "divider" };

      return null;
    })
    .filter((b): b is Block => b !== null);
}