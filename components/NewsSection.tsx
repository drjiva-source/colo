// components/NewsSection.tsx

import Link from "next/link";
import Image from "next/image";
import { truncateText } from "@/lib/utils";

type NewsItem = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
};

type Props = {
  title: string;
  items: NewsItem[];
};

export function NewsSection({ title, items }: Props) {
  return (
    <section className="flex flex-col gap-6">
      
      {/* Título de sección con acento rojo */}
      <h2 className="text-2xl font-bold text-foreground border-l-4 border-primary pl-4">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
          >
            {/* Imagen optimizada */}
            <div className="relative h-48 bg-muted/20 overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                /* Fallback con tema rojo */
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
              )}
              
              {/* Badge de categoría */}
              {item.category && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wide shadow-sm">
                  {item.category}
                </span>
              )}
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-muted line-clamp-2">
                  {truncateText(item.description, 120)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}