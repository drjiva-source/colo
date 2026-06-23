// app/page.tsx
import {
  getFeaturedNews,
  getTrendingNews,
  getMostReadNews,
} from "@/lib/sanity/queries";

import { FeaturedNewsHero } from "@/components/FeaturedNewsHero";
import { NewsSection } from "@/components/NewsSection";
import { AdBannerSlot } from "@/components/AdBannerSlot";
import { Newsletter } from "@/components/Newsletter";
import { EfemeridesWidget } from "@/components/EfemeridesWidget";

export default async function HomePage() {
  let featured = null;
  let trending: any[] = [];
  let mostRead: any[] = [];

  try {
    featured = await getFeaturedNews();
  } catch (err) {
    console.error("❌ Error en getFeaturedNews:", err);
  }

  try {
    trending = await getTrendingNews(3);
  } catch (err) {
    console.error("❌ Error en getTrendingNews:", err);
  }

  try {
    mostRead = await getMostReadNews(3);
  } catch (err) {
    console.error("❌ Error en getMostReadNews:", err);
  }

  return (
    <>
      {/* ✅ BANNER EN HEADER (Leaderboard) */}
      <AdBannerSlot position="header" />
      
      {/* 📰 GRID PRINCIPAL */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* 🔹 COLUMNA IZQUIERDA: Contenido Principal */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {featured ? (
              <FeaturedNewsHero news={featured} />
            ) : (
              <div className="p-6 bg-gray-100 rounded-xl text-center">
                <p className="text-gray-600">Cargando noticias...</p>
              </div>
            )}
            
            <NewsSection title="Tendencias" items={trending} />
            <NewsSection title="Más Leídas" items={mostRead} />
          </div>
          
          {/* 🔹 COLUMNA DERECHA: Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            
            {/* ✅ Panel Contenedor (Widgets agrupados) */}
            <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col gap-6 w-full">
              
              {/* Banner Rectangle (desde Sanity) */}
              <AdBannerSlot position="sidebar-rect" />
              
              {/* Widget de Efemérides */}
              <EfemeridesWidget />
              
              {/* Newsletter */}
              <Newsletter />
              
            </div>

            {/* Banner Skyscraper (desde Sanity) */}
            <AdBannerSlot position="sidebar-sky" />
            
          </aside>
        </div>
      </div>
    </>
  );
}