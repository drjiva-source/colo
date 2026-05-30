// lib/news.ts

import { news } from "@/data/news";
import type { NewsArticle, Category } from "@/types";



/**
 * Obtiene artículos relacionados (misma categoría, excluyendo el actual).
 * Ordena por fecha descendente (más recientes primero).
 */
export function getRelatedArticles(currentSlug: string, category: string, limit: number = 3): NewsArticle[] {
  return news
    .filter((n) => n.category === category && n.slug !== currentSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Obtiene la noticia destacada (Hero).
 * Por ahora devuelve la primera, pero podrías filtrar por isFeatured: true en el futuro.
 */
export function getFeaturedNews(): NewsArticle | undefined {
  return news[0];
}

/**
 * Obtiene noticias en tendencia (ordenadas por score).
 * @param limit Cantidad de noticias a devolver (default 3).
 */
export function getTrendingNews(limit: number = 3): NewsArticle[] {
  // Usamos [...news] para crear una copia y no mutar el array original
  return [...news]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Obtiene las noticias más leídas (ordenadas por views).
 * @param limit Cantidad de noticias a devolver (default 3).
 */
export function getMostReadNews(limit: number = 3): NewsArticle[] {
  return [...news]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

/**
 * Obtiene todas las categorías únicas disponibles.
 */
export function getAllCategories(): Category[] {
  // Set elimina duplicados automáticamente
  const uniqueCategories = Array.from(new Set(news.map((n) => n.category)));
  return uniqueCategories as Category[];
}

/**
 * Filtra noticias por una categoría específica.
 */
export function getNewsByCategory(category: string): NewsArticle[] {
  return news.filter((n) => n.category === category);
}

/**
 * (BONUS) Obtiene las noticias más recientes (ordenadas por fecha).
 * Útil para un sidebar de "Últimas noticias".
 */
export function getLatestNews(limit: number = 5): NewsArticle[] {
  return [...news]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}