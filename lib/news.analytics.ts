import { getNews } from "@/lib/news.server";
import { getViews } from "@/lib/news.client";

export function getTrendingNews(limit = 6) {
  const news = getNews();

  return [...news]
    .sort((a, b) => {
      const scoreA = (a.score ?? 0) + getViews(a.slug) * 0.5;
      const scoreB = (b.score ?? 0) + getViews(b.slug) * 0.5;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}