// app/categoria/[name]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { client } from "@/lib/sanity/client";
import { urlFor, getNewsByCategory } from "@/lib/sanity/queries"; // ✅ Solo funciones desde queries
import { CATEGORIES, type CategorySlug } from "@/lib/constants"; // ✅ Types y constantes desde constants
import type { Metadata } from "next";

// ✅ Validación de imagen de Sanity
function isValidSanityImage(image: any): boolean {
  return image?.asset?._ref?.startsWith("image-");
}

interface CategoryPageProps {
  params: Promise<{ name: string }>;
}

// 🟢 Genera rutas estáticas con fallback seguro
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ name: cat.slug }));
}

// 🟢 SEO Dinámico
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { name } = await params;
  const category = CATEGORIES.find((c) => c.slug === name);
  const categoryName = category?.name || name;
  
  return {
    title: `Noticias de ${categoryName} | El Colo Sin Filtro`,
    description: `Todas las noticias de la categoría ${categoryName}`,
  };
}

// 🟢 Componente Principal
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  
  // Validar que sea una categoría válida
  const category = CATEGORIES.find((c) => c.slug === name);
  if (!category) notFound();

  // ✅ Fetch de noticias usando la función importada
  let articles: any[] = [];
  try {
    articles = await getNewsByCategory(category.slug as CategorySlug, 20);
  } catch (error) {
    console.error("❌ Error fetching category news:", error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen bg-white">
      
      {/* 🔹 Header de Categoría */}
      <div className="mb-10 border-b border-gray-200 pb-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-red-600 mb-2 inline-block transition">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
          Noticias de {category.name}
        </h1>
        <p className="text-gray-500 mt-2">
          {articles.length} {articles.length === 1 ? "noticia encontrada" : "noticias encontradas"}
        </p>
      </div>

      {/* 🔹 Grid de Noticias */}
      {articles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-gray-400 text-lg mb-4">📭 Aún no hay noticias en esta categoría.</p>
          <Link href="/" className="text-red-600 hover:text-red-800 font-medium transition">
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