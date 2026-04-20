import { writable } from "svelte/store";
import { browser } from "$app/environment";

export type Lang = "es" | "en";

const initial: Lang =
  browser && localStorage.getItem("lang") === "en" ? "en" : "es";

export const lang = writable<Lang>(initial);