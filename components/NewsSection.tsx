// components/NewsSection.tsx
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

export function NewsSection({ 
  title, 
  items 
}: { 
  title: string; 
  items: NewsItem[] 
}) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article key={item._id} className="group">
            <Link href={`/news/${item.slug}`} className="block">
              <div className="relative h-48 bg-muted/20 overflow-hidden rounded-xl">
                {/* ✅ Imagen segura */}
                {item.image && isValidImage(item.image) ? (
                  <Image
                    src={urlFor(item.image).width(400).height(200).url()}
                    alt={item.title || 'Noticia'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  </div>
                )}
              </div>
              
              <div className="mt-3">
                {item.category && (
                  <span className="text-xs font-semibold text-primary">
                    {item.category}
                  </span>
                )}
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}