// app/sitemap.ts

import { MetadataRoute } from 'next';
import { news } from '@/data/news';
import { getAllCategories } from '@/lib/news';
import { siteConfig } from '@/config/site';

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Página principal
  const home = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  };

  // 2. Páginas de categorías
  const categories = getAllCategories().map((cat) => ({
    url: `${baseUrl}/categoria/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Artículos de noticias
  const articles = news.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Páginas estáticas
  const staticPages = [
    {
      url: `${baseUrl}/acerca`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Unimos todo en un solo array
  return [home, ...categories, ...articles, ...staticPages];
}