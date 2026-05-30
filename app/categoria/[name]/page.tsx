// app/categoria/[name]/page.tsx

import { getNewsByCategory, getAllCategories } from "@/lib/news";
import { NewsSection } from "@/components/NewsSection";
import { CategoriesBar } from "@/components/CategoriesBar";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  
  // Decodificar el nombre de la categoría (por si tiene espacios o acentos)
  const categoryName = decodeURIComponent(name);
  
  // Validar que la categoría exista
  const validCategories = getAllCategories();
  if (!validCategories.includes(categoryName as any)) {
    notFound();
  }

  // Obtener noticias de esa categoría
  const items = getNewsByCategory(categoryName);

  return (
    <main className="flex flex-col gap-10 max-w-6xl mx-auto px-4 py-12">
      {/* Header de la categoría */}
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="text-gray-500 hover:text-blue-600 transition"
        >
          ← Inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {categoryName}
        </h1>
      </div>

      {/* Barra de categorías para navegar entre ellas */}
      <CategoriesBar categories={validCategories} />

      {/* Listado de noticias filtradas */}
      {items.length > 0 ? (
        <NewsSection 
          title={`Noticias de ${categoryName}`} 
          items={items} 
        />
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No hay noticias en esta categoría aún.
          </p>
          <Link 
            href="/" 
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Ver todas las noticias
          </Link>
        </div>
      )}
    </main>
  );
}