// app/categoria/[name]/page.tsx
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/queries";
import { NewsCard } from "@/components/NewsCard";
import Link from "next/link";

// ✅ Validación de imagen (misma que en tus otros componentes)
function isValidSanityImage(image: any): boolean {
  return image?.asset?._ref?.startsWith('image-');
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  //  Query a Sanity: Busca noticias por categoría (ignora mayúsculas/minúsculas)
  const query = `*[_type == "news" && lower(category) == lower($cat)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    image,
    score,
    _createdAt
  }`;

  const articles = await client.fetch(query, { cat: categoryName });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen bg-white">
      
      {/* 🔹 Título de la Categoría */}
      <div className="mb-10 border-b border-gray-200 pb-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-primary mb-2 inline-block">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          Noticias de {categoryName}
        </h1>
        <p className="text-gray-500 mt-2">
          {articles.length} {articles.length === 1 ? 'noticia encontrada' : 'noticias encontradas'}
        </p>
      </div>

      {/* 🔹 Grid de Noticias */}
      {articles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-lg">📭 Aún no hay noticias en esta categoría.</p>
          <Link href="/" className="text-primary hover:underline mt-2 inline-block">
            Ver otras noticias
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item: any) => (
            <NewsCard key={item._id} article={item} />
          ))}
        </div>
      )}
    </div>
  );
}