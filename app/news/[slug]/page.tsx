// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/queries";
import type { Metadata } from "next";

// ✅ Validación de imagen de Sanity
function isValidSanityImage(image: any): boolean {
  return (
    image?.asset?._ref &&
    typeof image.asset._ref === "string" &&
    image.asset._ref.startsWith("image-")
  );
}

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

// 🟢 Genera rutas estáticas con fallback seguro (para build en Vercel)
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(
      `*[_type == "news" && defined(slug.current)].slug.current`
    );
    return slugs.map((slug: string) => ({ slug }));
  } catch (error) {
    console.warn("⚠️ Fallback: No se pudieron generar static params para noticias");
    // Fallback vacío: las páginas se generarán bajo demanda (ISR)
    return [];
  }
}

// 🟢 Fetch de una noticia por slug
async function getArticleBySlug(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    content,
    image,
    views,
    score,
    _createdAt,
    _updatedAt
  }`;
  
  return await client.fetch(query, { slug });
}

// 🟢 SEO Dinámico
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Noticia no encontrada | Colo News",
      description: "La noticia que buscas no existe o fue eliminada.",
    };
  }

  const imageUrl = isValidSanityImage(article.image)
    ? urlFor(article.image).width(1200).height(630).url()
    : null;

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/news/${article.slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: article.title }] : [],
      type: "article",
      publishedTime: article._createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

// 🟢 Componente Principal
export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  
  let article: any = null;
  try {
    article = await getArticleBySlug(slug);
  } catch (error) {
    console.error("❌ Error fetching article:", error);
  }

  if (!article) {
    notFound();
  }

  const imageUrl = isValidSanityImage(article.image)
    ? urlFor(article.image).width(1200).height(600).url()
    : null;

  // Formatear fecha sin dependencias externas
  const fecha = article._createdAt
    ? new Date(article._createdAt).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Fecha desconocida";

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 min-h-screen bg-white text-gray-900">
      
      {/* 🔹 Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition">Inicio</Link>
        <span className="text-gray-300">/</span>
        <Link 
          href={`/categoria/${encodeURIComponent(article.category?.toLowerCase() || "general")}`} 
          className="hover:text-blue-600 transition capitalize"
        >
          {article.category || "General"}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-medium truncate max-w-[200px]">
          {article.title}
        </span>
      </nav>

      {/* 🔹 Imagen Principal */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.title || "Noticia"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-lg">📰 Sin imagen</span>
          </div>
        )}
      </div>

      {/* 🔹 Cabecera */}
      <header className="mb-10">
        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4 capitalize">
          {article.category || "General"}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={article._createdAt}>Publicado el {fecha}</time>
          <span>•</span>
          <span>{article.views || 0} lecturas</span>
        </div>
      </header>

      {/* 🔹 Descripción / Extracto */}
      {article.description && (
        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-blue-600 pl-4">
          {article.description}
        </p>
      )}

      {/* 🔹 Contenido Principal */}
      <div className="prose prose-lg prose-slate max-w-none mb-12 text-gray-800">
        {article.content && Array.isArray(article.content) ? (
          article.content.map((block: any, index: number) => {
            const text = block.children?.map((c: any) => c.text).join("") || "";
            if (!text.trim()) return null;
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {text}
              </p>
            );
          })
        ) : (
          <p className="text-gray-700 leading-relaxed">
            {article.content || "Contenido no disponible."}
          </p>
        )}
      </div>

      {/* 🔹 Compartir (opcional) */}
      <div className="flex items-center gap-3 py-6 border-y border-gray-200 mb-12">
        <span className="text-sm font-medium text-gray-700">Compartir:</span>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL || "https://colo-jwab.vercel.app"}/news/${article.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 rounded hover:bg-blue-600 hover:text-white transition"
          aria-label="Compartir en Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${process.env.NEXT_PUBLIC_SITE_URL || "https://colo-jwab.vercel.app"}/news/${article.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 rounded hover:bg-sky-500 hover:text-white transition"
          aria-label="Compartir en X"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </div>

      {/* 🔹 Volver al inicio */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
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