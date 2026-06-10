// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/queries";
import { AdBanner } from "@/components/AdBanner";
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

// 🟢 Genera rutas estáticas con fallback seguro
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(
      `*[_type == "news" && defined(slug.current)].slug.current`
    );
    return slugs.map((slug: string) => ({ slug }));
  } catch (error) {
    console.warn("⚠️ Fallback: No se pudieron generar static params para noticias");
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

// 🟢 SEO Dinámico MEJORADO
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Noticia no encontrada | EL COLO SIN FILTRO",
      description: "La noticia que buscas no existe o fue eliminada.",
      robots: { index: false, follow: false },
    };
  }

  // Texto plano para descripción (limpio de HTML si fuera necesario)
  const description = article.description || "";
  const shortDescription = description.length > 155 
    ? description.slice(0, 152) + "..." 
    : description;

  // URL canónica completa
  const canonicalUrl = `https://elcolosinfiltro.com.ar/news/${article.slug}`;
  
  // Imagen para redes (OpenGraph)
  const ogImage = isValidSanityImage(article.image)
    ? urlFor(article.image).width(1200).height(630).url()
    : "https://elcolosinfiltro.com.ar/og-default.jpg";

  return {
    title: `${article.title} | EL COLO SIN FILTRO`,
    description: shortDescription,
    
    // ✅ Canonical URL (evita contenido duplicado)
    alternates: {
      canonical: canonicalUrl,
    },
    
    // ✅ OpenGraph completo
    openGraph: {
      title: article.title,
      description: shortDescription,
      url: canonicalUrl,
      siteName: "EL COLO SIN FILTRO",
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      locale: "es_AR",
      type: "article",
      publishedTime: article._createdAt,
      modifiedTime: article._updatedAt,
      section: article.category || "Noticias",
      tags: [], // Podés agregar tags si los tenés en Sanity
    },
    
    // ✅ Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: shortDescription,
      images: [ogImage],
      creator: "@elcolosinfiltro", // Cambiá por tu usuario real
    },
    
    // ✅ Robots: indexar esta noticia
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// 🟢 Componente JSON-LD para Google News (Structured Data)
function NewsArticleSchema({ article, url }: { article: any; url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.description,
    "image": isValidSanityImage(article.image) 
      ? urlFor(article.image).width(1200).height(630).url() 
      : undefined,
    "datePublished": article._createdAt,
    "dateModified": article._updatedAt || article._createdAt,
    "author": {
      "@type": "Organization",
      "name": "EL COLO SIN FILTRO",
    },
    "publisher": {
      "@type": "Organization",
      "name": "EL COLO SIN FILTRO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://elcolosinfiltro.com.ar/logo.png",
        "width": 600,
        "height": 60,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    "articleSection": article.category || "Noticias",
    "keywords": "noticias, formosa, el colorado, actualidad",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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

  // Normalizar categoría para comparación
  const categorySlug = article.category?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
  const showInArticleAd = categorySlug === "politica" || categorySlug === "locales";

  // URL canónica para el schema
  const canonicalUrl = `https://elcolosinfiltro.com.ar/news/${article.slug}`;

  return (
    <>
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

        {/* 🔹 Contenido Principal CON BANNER IN-ARTICLE */}
        <div className="prose prose-lg prose-slate max-w-none mb-12 text-gray-800">
          {article.content && Array.isArray(article.content) ? (
            article.content.map((block: any, index: number) => {
              const text = block.children?.map((c: any) => c.text).join("") || "";
              if (!text.trim()) return null;
              
              return (
                <div key={index}>
                  <p className="mb-4 leading-relaxed">
                    {text}
                  </p>
                  
                  {/* 📢 BANNER IN-ARTICLE - Después del 2° párrafo (index 1) */}
                  {index === 1 && showInArticleAd && (
                    <div className="my-8 flex justify-center">
                      <AdBanner 
                        variant="rectangle" 
                        label="Patrocinado"
                        imageSrc="/ads/estudio-juridico.jpg"
                        mobileImageSrc="/ads/estudio-juridico-320x100.jpg"
                        // href="https://estudiojuridico.com"
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {article.content || "Contenido no disponible."}
            </p>
          )}
        </div>

        {/* 🔹 Compartir */}
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

      {/* ✅ JSON-LD Structured Data para Google */}
      <NewsArticleSchema article={article} url={canonicalUrl} />
    </>
  );
}