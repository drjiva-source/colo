// app/news/[slug]/page.tsx

import { news } from "@/data/news";
import { getRelatedArticles } from "@/lib/news";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { RelatedArticles } from "@/components/RelatedArticles";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 🟢 SEO Dinámico
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);

  if (!article) {
    return {
      title: "Noticia no encontrada",
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/news/${slug}`,
      images: [
        {
          url: article.image || "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.createdAt,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image || "/default-og.jpg"],
    },
  };
}

// 🟢 Componente Principal
export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  // Obtener artículos relacionados
  const related = getRelatedArticles(slug, article.category, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition">Inicio</Link>
        <span>/</span>
        <Link href={`/categoria/${article.category}`} className="hover:text-blue-600 transition">
          {article.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Imagen Principal Optimizada */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden bg-slate-200">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200">
            Sin imagen
          </div>
        )}
      </div>

      {/* Cabecera */}
      <header className="mb-10">
        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <time>Publicado el {formatDate(article.createdAt)}</time>
          <span>•</span>
          <span>{article.views} lecturas</span>
        </div>
      </header>

      {/* Contenido */}
      <div className="prose prose-lg prose-slate max-w-none mb-12">
        <p className="text-xl text-slate-700 leading-relaxed mb-6">
          {article.content || article.description}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-slate-600 leading-relaxed mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      {/* Compartir en Redes (Opcional) */}
      <div className="flex items-center gap-4 py-6 border-y border-slate-200 mb-12">
        <span className="text-sm font-medium text-slate-700">Compartir:</span>
        <button className="p-2 bg-slate-100 rounded hover:bg-blue-600 hover:text-white transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </button>
        <button className="p-2 bg-slate-100 rounded hover:bg-blue-400 hover:text-white transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
        </button>
        <button className="p-2 bg-slate-100 rounded hover:bg-pink-600 hover:text-white transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </button>
      </div>

      {/* Artículos Relacionados */}
      <RelatedArticles items={related} />

      {/* Volver al inicio */}
      <div className="mt-12 pt-8 border-t border-slate-200 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </article>
  );
}