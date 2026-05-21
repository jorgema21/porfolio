import { browser } from "$app/environment";

export type Lang = "es" | "en";

const initial: Lang =
  browser && localStorage.getItem("lang") === "en" ? "en" : "es";

class LangState {
  current = $state<Lang>(initial);

  set(value: Lang) {
    this.current = value;
    if (browser) {
      localStorage.setItem("lang", value);
    }
  }
}

export const langSignal = new LangState();
