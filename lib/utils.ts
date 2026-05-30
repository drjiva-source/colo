// lib/utils.ts

/**
 * Simula una espera (útil para testing o delays artificiales).
 * @param ms Milisegundos a esperar.
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formatea una fecha para mostrarla bonita en español.
 * Ejemplo: "29 May, 2026"
 */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Corta un texto largo y agrega "..."
 * Ejemplo: "Un título muy largo..."
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}