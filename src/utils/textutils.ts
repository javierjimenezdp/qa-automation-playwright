export function normalizeText(text: string | null): string {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ") // junta múltiples espacios/saltos en 1 espacio
    .replace(/['"]+/g, "") // quita comillas ' o "
    .trim(); // corta espacios al inicio y fin
}
