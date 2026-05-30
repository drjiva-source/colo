// lib/news.ts
import { news } from "@/data/news";
import type { NewsArticle, Category } from "@/types"; // 👈 Importamos

export function getFeaturedNews(): NewsArticle {
  return news[0];
}

// Retorna un array de noticias
export function getTrendingNews(): NewsArticle[] {
  return [...news]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function getMostReadNews(): NewsArticle[] {
  return [...news]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);
}

// Retorna un array de strings (las categorías)
export function getAllCategories(): Category[] {
  // Eliminamos duplicados
  const uniqueCategories = Array.from(new Set(news.map((n) => n.category)));
  return uniqueCategories as Category[];
}

// Retorna noticias filtradas por categoría
export function getNewsByCategory(category: string): NewsArticle[] {
  return news.filter((n) => n.category === category);
}