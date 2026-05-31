// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/queries";

// ✅ Validación simple de imagen
function isValidSanityImage(image: any): boolean {
  return image?.asset?._ref?.startsWith('image-');
}

// 🟢 Fetch de datos
async function getArticleBySlug(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, category, description, content, image, views, _createdAt
  }`;
  return await client.fetch(query, { slug });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 🟢 SEO Básico
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Noticia no encontrada" };
  
  return { title: article.title, description: article.description };
}

// 🟢 Componente Principal
export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  // Si no hay artículo, mostrar 404 real
  if (!article) notFound();

  const imageUrl = isValidSanityImage(article.image)
    ? urlFor(article.image).width(1200).height(600).url()
    : null;

  // Formatear fecha sin dependencias externas
  const fecha = article._createdAt 
    ? new Date(article._createdAt).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Fecha desconocida';

  return (
    // Fondo blanco explícito para evitar texto invisible
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white min-h-screen text-black">
      
      {/* 🔹 Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">Inicio</Link>
        <span>/</span>
        <Link href={`/categoria/${article.category}`} className="hover:text-blue-600">
          {article.category}
        </Link>
      </nav>

      {/* 🔹 Imagen Principal */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-2xl overflow-hidden bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.title || 'Noticia'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            📰 Sin imagen
          </div>
        )}
      </div>

      {/* 🔹 Cabecera */}
      <header className="mb-10">
        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time>Publicado el {fecha}</time>
          <span>•</span>
          <span>{article.views || 0} lecturas</span>
        </div>
      </header>

      {/* 🔹 Contenido */}
      <div className="prose prose-lg max-w-none mb-12 text-gray-800">
        <p className="text-xl leading-relaxed mb-6 font-medium">
          {article.description}
        </p>
        
        {/* Renderizado seguro del contenido */}
        {article.content && Array.isArray(article.content) ? (
          article.content.map((block: any, i: number) => (
            <p key={i} className="mb-4 text-gray-700">
              {block.children?.map((c: any) => c.text).join('')}
            </p>
          ))
        ) : (
          <p className="text-gray-700">Contenido no disponible.</p>
        )}
      </div>

      {/* 🔹 Botón Volver */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition">
          ← Volver al inicio
        </Link>
      </div>
    </article>
  );
}