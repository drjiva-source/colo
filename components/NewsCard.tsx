// components/NewsCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/queries';

// ✅ Validación de imagen segura
function isValidImage(image: any): boolean {
  return (
    image?.asset?._ref && 
    typeof image.asset._ref === 'string' && 
    image.asset._ref.includes('-')
  );
}

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  description?: string;
  image?: any;
  score?: number;
  views?: number;
}

export function NewsCard({ article }: { article: NewsItem }) {
  if (!article?.slug) return null;

  return (
    <Link
      href={`/news/${article.slug}`} // ✅ Usa slug string
      className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition bg-white block"
    >
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        {/* ✅ Imagen segura */}
        {article.image && isValidImage(article.image) ? (
          <Image
            src={urlFor(article.image).width(400).height(224).url()}
            alt={article.title || 'Noticia'}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="p-5">
        {article.category && (
          <span className="text-sm font-semibold uppercase text-blue-600">
            {article.category}
          </span>
        )}

        <h3 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-gray-600 mt-3 leading-7 line-clamp-2">
            {article.description}
          </p>
        )}
      </div>
    </Link>
  );
}