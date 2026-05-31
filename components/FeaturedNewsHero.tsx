// components/FeaturedNewsHero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/queries';

// ✅ Función para evitar que la app se caiga por imágenes corruptas
function isValidImage(image: any): boolean {
  return (
    image?.asset?._ref && 
    typeof image.asset._ref === 'string' && 
    image.asset._ref.includes('-') // Los IDs reales de Sanity tienen guiones
  );
}

interface NewsItem {
  _id: string;
  title: string;
  slug: string; // Query devuelve string
  category?: string;
  description?: string;
  image?: any;
  score?: number;
  _createdAt?: string;
}

export function FeaturedNewsHero({ news }: { news: NewsItem | null }) {
  if (!news) return null;

  return (
    <section className="relative">
      {/* ✅ Enlace usa news.slug (string) */}
      <Link href={`/news/${news.slug}`} className="group block">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-slate-900">
          
          {/* ✅ Imagen segura: solo si es válida */}
          {news.image && isValidImage(news.image) ? (
            <Image
              src={urlFor(news.image).width(1200).height(600).url()}
              alt={news.title || 'Noticia destacada'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
              loading="eager" // Mejora LCP
            />
          ) : (
            // Placeholder si la imagen falla
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-gray-400">Imagen no disponible</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Contenido */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {news.category && (
              <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full mb-3">
                {news.category}
              </span>
            )}
            
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {news.title}
            </h1>
            
            {news.description && (
              <p className="text-gray-200 text-sm md:text-base line-clamp-2">
                {news.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </section>
  );
}