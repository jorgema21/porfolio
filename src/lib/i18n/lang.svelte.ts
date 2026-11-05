import { browser } from "$app/env";

export type Lang = "es" | "en";

class LangState {
  current = $state<Lang>("es");

  initialize() {
    if (!browser) return;

    const stored = localStorage.getItem("lang");

    const detected: Lang =
      stored === "es" || stored === "en"
        ? stored
        : navigator.language.toLowerCase().startsWith("es")
          ? "es"
          : "en";

    this.current = detected;
  }

  set(value: Lang) {
    this.current = value;

    if (browser) {
      localStorage.setItem("lang", value);
    }
  }
}

export const langSignal = new LangState();
