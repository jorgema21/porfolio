import { langSignal } from "./lang.svelte";
import type { Lang } from "./lang.svelte";
import { dictionaries } from "./dictionaries";

export type Dictionary = typeof dictionaries.es;

class TranslationEngine {
  get current(): (typeof dictionaries)[Lang] {
    const currentLang: Lang = langSignal?.current || "es";

    return dictionaries[currentLang] || dictionaries.es;
  }
}

const engine = new TranslationEngine();

export const t = new Proxy({} as Dictionary, {
  get(_, prop) {
    return (engine.current as Dictionary)[prop as keyof Dictionary];
  },
});

export function toggleLang(): void {
  const nextLang: Lang = langSignal.current === "es" ? "en" : "es";
  langSignal.set(nextLang);
}

export { langSignal };
