// components/FeaturedNewsHero.tsx

import Link from "next/link";
import Image from "next/image";

type Props = {
  news: {
    slug: string;
    title: string;
    category: string;
    description: string;
    image?: string;
  };
};

export function FeaturedNewsHero({ news }: Props) {
  return (
    <section className="relative">
      <Link href={`/news/${news.slug}`} className="group block">
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-slate-900">
          
          {/* ✅ IMAGEN OPTIMIZADA */}
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-red-900" />
          )}
          
          {/* Overlay oscuro para que el texto se lea bien */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs md:text-sm font-bold rounded-full mb-3 uppercase tracking-wider">
              {news.category}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors">
              {news.title}
            </h2>
            <p className="text-gray-200 text-base md:text-lg line-clamp-2 max-w-2xl">
              {news.description}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}