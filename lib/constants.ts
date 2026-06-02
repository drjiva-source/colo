// lib/constants.ts

// ✅ Categorías unificadas para todo el sitio
export const CATEGORIES = [
  { name: "Política", slug: "politica" },
  { name: "Economía", slug: "economia" },
  { name: "Cultura", slug: "cultura" },
  { name: "Deportes", slug: "deportes" },
  { name: "Policiales", slug: "policiales" },
  { name: "Locales", slug: "locales" },
  { name: "Opinión", slug: "opinion" },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];

// ✅ Otros valores constantes del sitio
export const SITE_NAME = "El Colo Sin Filtro";
export const SITE_TAGLINE = "El Colorado - Formosa";
export const SITE_URL = "https://colo-jwab.vercel.app";