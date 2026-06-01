// app/categoria/[name]/page.tsx
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/queries";
import { NewsCard } from "@/components/NewsCard";
import Link from "next/link";
import type { Metadata } from "next";

// ✅ Validación de imagen de Sanity
function isValidSanityImage(image: any): boolean {
  return (
    image?.asset?._ref &&
    typeof image.asset._ref === "string" &&
    image.asset._ref.startsWith("image-")
  );
}

interface CategoryPageProps {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 🟢 Genera rutas estáticas con fallback seguro (para build en Vercel)
export async function generateStaticParams() {
  try {
    const categories = await client.fetch(`*[_type == "news" && defined(category)].category`);
    const unique = [...new Set(categories)].filter(Boolean) as string[];
    
    return unique.map((cat) => ({
      name: encodeURIComponent(cat.toLowerCase().trim()),
    }));
  } catch (error) {
    console.warn("⚠️ Fallback: No se pudieron generar static params para categorías");
    // Fallback para que el build no falle
    return [
      { name: "deportes" },
      { name: "politica" },
      { name: "economia" },
      { name: "tecnologia" },
      { name: "entretenimiento" },
    ];
  }
}

// 🟢 SEO Dinámico
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  
  return {
    title: `Noticias de ${categoryName} | Colo News`,
    description: `Todas las noticias de la categoría ${categoryName}`,
  };
}

// 🟢 Fetch de noticias por categoría
async function getNewsByCategory(category: string) {
  const query = `*[_type == "news" && lower(category) == lower($cat) && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    image,
    score,
    views,
    _createdAt
  }`;
  
  return await client.fetch(query, { cat: category });
}

// 🟢 Componente Principal
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  
  let articles: any[] = [];
  try {
    articles = await getNewsByCategory(categoryName);
  } catch (error) {
    console.error("❌ Error fetching category news:", error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen bg-white">
      
      {/* 🔹 Header de Categoría */}
      <div className="mb-10 border-b border-gray-200 pb-4">
        <Link 
          href="/" 
          className="text-sm text-gray-500 hover:text-blue-600 mb-2 inline-block transition"
        >
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          Noticias de {categoryName}
        </h1>
        <p className="text-gray-500 mt-2">
          {articles.length} {articles.length === 1 ? "noticia encontrada" : "noticias encontradas"}
        </p>
      </div>

      {/* 🔹 Grid de Noticias */}
      {articles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-gray-400 text-lg mb-4">📭 Aún no hay noticias en esta categoría.</p>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium transition"
          >
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