// app/page.tsx
import {
  getFeaturedNews,
  getTrendingNews,
  getMostReadNews,
  getAllCategories,
  urlFor,
} from "@/lib/sanity/queries";

import { FeaturedNewsHero } from "@/components/FeaturedNewsHero";
import { NewsSection } from "@/components/NewsSection";
import { CategoriesBar } from "@/components/CategoriesBar";
import { AdBanner } from "@/components/AdBanner";

export default async function HomePage() {
  let featured = null;
  let trending: any[] = [];
  let mostRead: any[] = [];
  let categories: any[] = [];

  try {
    // ✅ IMPORTANTE: Usar AWAIT porque las funciones son async
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

  try {
    categories = await getAllCategories();
  } catch (err) {
    console.error("❌ Error en getAllCategories:", err);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-8 flex flex-col gap-10">
        {featured ? (
          <FeaturedNewsHero news={featured} />
        ) : (
          <div className="p-6 bg-gray-100 rounded-xl text-center">
            <p className="text-gray-600">Cargando noticias...</p>
          </div>
        )}
        <CategoriesBar categories={categories} />
        <NewsSection title="Tendencias" items={trending} />
        <NewsSection title="Más Leídas" items={mostRead} />
      </div>
      <aside className="lg:col-span-4 flex flex-col gap-8">
        <AdBanner variant="rectangle" label="Patrocinado" imageSrc="/ads/maquinagro-300x250.jpg" href="https://maquinagro.com.ar" />
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-2">📬 Suscríbete</h3>
          <p className="text-sm text-muted mb-4">Recibe noticias cada mañana.</p>
          <form className="flex flex-col gap-3">
            <input type="email" placeholder="tu@email.com" className="w-full bg-background border border-border rounded px-4 py-2" />
            <button className="w-full bg-primary text-white py-2 rounded">Suscribirse</button>
          </form>
        </div>
        <AdBanner variant="skyscraper" label="Publicidad" imageSrc="/ads/crishop-300x600.jpg" href="https://crishop.com" />
      </aside>
    </div>
  );
}