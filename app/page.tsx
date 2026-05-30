// app/page.tsx

import {
  getFeaturedNews,
  getTrendingNews,
  getMostReadNews,
  getAllCategories,
} from "@/lib/news";

import { FeaturedNewsHero } from "@/components/FeaturedNewsHero";
import { NewsSection } from "@/components/NewsSection";
import { CategoriesBar } from "@/components/CategoriesBar";
import { AdBanner } from "@/components/AdBanner";

export default async function HomePage() {
  // 1. Cargar todos los datos necesarios en paralelo
  const [featured, trending, mostRead, categories] = await Promise.all([
    getFeaturedNews(),
    getTrendingNews(3),
    getMostReadNews(3),
    getAllCategories(),
  ]);

  return (
    //  ESTRUCTURA PRINCIPAL: GRID DE 12 COLUMNAS
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      
      {/* =========================================
          🔹 COLUMNA PRINCIPAL (8/12 columnas)
          ========================================= */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        
        {/* 1. Noticia Destacada (Hero) */}
        <FeaturedNewsHero news={featured} />

        {/* 2. Barra de Categorías */}
        <CategoriesBar categories={categories} />

        {/* 3. Sección: Tendencias */}
        <NewsSection title="Tendencias" items={trending} />

        {/* 4. Sección: Más Leídas */}
        <NewsSection title="Más Leídas" items={mostRead} />
      </div>

      {/* =========================================
          🔹 SIDEBAR (4/12 columnas)
          Aquí van las Publicidades y Widgets
          ========================================= */}
      <aside className="lg:col-span-4 flex flex-col gap-8">
        
        {/* 🔹 BANNER 1: Maquinagro (Rectangular) */}
        <AdBanner 
          variant="rectangle"
          label="Patrocinado"
          imageSrc="/ads/maquinagro-300x250.jpg"
          href="https://maquinagro.com.ar"
        />

        {/* 🔹 WIDGET NEWSLETTER */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-2">📬 Suscríbete al Newsletter</h3>
          <p className="text-sm text-muted mb-4">Recibe las noticias más importantes cada mañana.</p>
          <form className="flex flex-col gap-3" action="#">
            <input type="email" placeholder="tu@email.com" className="w-full bg-background border border-border rounded px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
            <button type="submit" className="w-full bg-primary text-white text-sm font-bold py-2 rounded hover:bg-primary/90">Suscribirse</button>
          </form>
        </div>

        {/* 🔹 BANNER 2: Segunda Marca (Rascacielos) */}
        <AdBanner 
          variant="skyscraper"
          label="Publicidad"
          imageSrc="/ads/crishop-300x600.jpg"
          href="https://crishop.com"
        />

      </aside>
    </div>
  );
}