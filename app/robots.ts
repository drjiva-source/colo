// app/robots.ts

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Bloqueamos rutas internas de Next.js y APIs (si las tuvieras)
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    // Le decimos a Google dónde está tu sitemap
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}