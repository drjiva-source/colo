// app/categoria/[name]/page.tsx
import { getNewsByCategory } from "@/lib/sanity/queries";
import { CATEGORIES, type CategorySlug } from "@/lib/constants";
import { NewsCard } from "@/components/NewsCard";
import { AdBanner } from "@/components/AdBanner";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ name: cat.slug }));
}

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const { name } = await params;
  
  const category = CATEGORIES.find((c) => c.slug === name);

  if (!category) notFound();

  const news = await getNewsByCategory(name as CategorySlug) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER CON LEADERBOARD */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex-1">
            <Link href="/" className="text-sm text-gray-500 hover:text-red-600 mb-2 inline-block">
              ← Volver al inicio
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              {category.name}
            </h1>
            <p className="text-gray-600">
              Noticias sobre {category.name.toLowerCase()}
            </p>
          </div>

          {/* LEADERBOARD - Solo en Economía y Política */}
          {(name === 'economia' || name === 'politica') && (
            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <AdBanner 
                variant="leaderboard" 
                label="Patrocinado"
              />
            </div>
          )}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Noticias */}
          <div className="flex-1">
            {news.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">📭 No hay noticias en {category.name} aún.</p>
                <Link href="/" className="text-red-600 hover:underline mt-4 inline-block">
                  Ir al inicio
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {news.map((item: any) => (
                  <NewsCard key={item._id} article={item} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar CON SKYSCRAPER */}
          <aside className="lg:w-[300px] shrink-0 space-y-8">
            
            {/* SKYSCRAPER - Solo en Locales y Economía */}
            {(name === 'locales' || name === 'economia') && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <AdBanner 
                  variant="skyscraper" 
                  label="Destacado"
                />
              </div>
            )}

            {/* Newsletter placeholder */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
              <h3 className="font-bold text-blue-900 mb-2">📩 Newsletter</h3>
              <p className="text-sm text-blue-700 mb-4">Recibí las noticias en tu correo.</p>
              <Link href="/#newsletter" className="text-sm font-bold text-blue-600 hover:underline">
                Suscribirme →
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}