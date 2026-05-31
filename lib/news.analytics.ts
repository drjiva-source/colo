// lib/news.analytics.ts

// ✅ Importamos el array REAL de noticias (no una función inventada)
import { news } from "@/data/news";
import { getViews } from "@/lib/news.client";

export function getTrendingNews(limit = 6) {
  // ✅ Usamos 'news' directamente
  return [...news]
    .sort((a, b) => {
      const scoreA = (a.score ?? 0) + getViews(a.slug) * 0.5;
      const scoreB = (b.score ?? 0) + getViews(b.slug) * 0.5;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}