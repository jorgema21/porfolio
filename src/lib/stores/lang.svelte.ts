export const lang = $state<"es" | "en">("es");
function formatDate(date: string, lang: "es" | "en") {
  const d = new Date(date);

  if (lang === "es") {
    return d.toLocaleDateString("es-ES");
  }

  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
}
