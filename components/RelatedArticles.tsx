// components/RelatedArticles.tsx

import Link from "next/link";
import type { NewsArticle } from "@/types";

type Props = {
  title?: string;
  items: Pick<NewsArticle, "slug" | "title" | "category" | "image">[];
};

export function RelatedArticles({ title = "Artículos Relacionados", items }: Props) {
  // Si no hay relacionados, no renderiza nada
  if (items.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-1.5 h-7 bg-blue-600 rounded-full"></span>
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
          >
            {/* Imagen */}
            <div className="relative h-40 bg-slate-200 overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300" />
              )}
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur text-[10px] font-bold text-slate-700 rounded uppercase tracking-wide shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Título */}
            <div className="p-4 grow flex items-center">
              <h4 className="font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}