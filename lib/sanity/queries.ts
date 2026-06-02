// lib/sanity/queries.ts
import { client } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { CATEGORIES, type CategorySlug } from "@/lib/constants"; // 👈 Import desde constants

// 🔹 Configura el generador de URLs de imágenes
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

export function urlFor(source: any) {
  return builder.image(source);
}

// 👉 Noticia Destacada
export async function getFeaturedNews() {
  console.log("🔍 [QUERY] getFeaturedNews - Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  
  const result = await client.fetch(
    `*[_type == "news" && defined(slug.current)] | order(score desc, _createdAt desc)[0]{ 
      _id, 
      title, 
      "slug": slug.current,
      category,
      description,
      image,
      score,
      _createdAt
    }`,
    {},
    { next: { revalidate: 0 } }
  );
  
  console.log("📦 [QUERY] Resultado getFeaturedNews:", result);
  return result;
}

// 👉 Tendencias (3 noticias)
export async function getTrendingNews(limit = 3) {
  console.log(`🔍 [QUERY] getTrendingNews - Buscando ${limit} noticias...`);
  
  const result = await client.fetch(
    `*[_type == "news" && defined(slug.current)] | order(score desc, _createdAt desc)[0...${limit}]{ 
      _id, 
      title, 
      "slug": slug.current,
      category,
      description,
      image,
      score,
      _createdAt
    }`,
    {},
    { next: { revalidate: 0 } }
  );
  
  console.log("📦 [QUERY] getTrendingNews - Encontradas:", result?.length || 0);
  return result;
}

// 👉 Más Leídas (3 noticias)
export async function getMostReadNews(limit = 3) {
  return client.fetch(
    `*[_type == "news" && defined(slug.current)] | order(views desc, _createdAt desc)[0...${limit}]{ 
      _id, 
      title, 
      "slug": slug.current,
      category,
      description,
      image,
      views
    }`,
    {},
    { next: { revalidate: 0 } }
  );
}

// 👉 Categorías unificadas (las 7 definidas en constants.ts)
export async function getAllCategories() {
  console.log("🔍 [QUERY] getAllCategories - Devolviendo categorías unificadas");
  return CATEGORIES.map(cat => ({ name: cat.name, slug: cat.slug }));
}

// 👉 Noticias por categoría específica
export async function getNewsByCategory(categorySlug: CategorySlug, limit = 10) {
  console.log(`🔍 [QUERY] getNewsByCategory - Categoría: ${categorySlug}`);
  
  const result = await client.fetch(
    `*[_type == "news" && category == $category && defined(slug.current)] | order(_createdAt desc)[0...${limit}]{ 
      _id, 
      title, 
      "slug": slug.current,
      category,
      description,
      image,
      score,
      views,
      _createdAt
    }`,
    { category: categorySlug },
    { next: { revalidate: 60 } }
  );
  
  console.log(`📦 [QUERY] Noticias en "${categorySlug}":`, result?.length || 0);
  return result;
}

// 👉 Noticias relacionadas
export async function getRelatedArticles(currentSlug: string, category: string, limit = 3) {
  return client.fetch(
    `*[_type == "news" && slug.current != $slug && category == $category && defined(slug.current)] | order(_createdAt desc)[0...${limit}]{ 
      _id, 
      title, 
      "slug": slug.current,
      category,
      description,
      image,
      score
    }`,
    { slug: currentSlug, category },
    { next: { revalidate: 0 } }
  );
}

// 👉 Efemérides del día actual
export async function getEfemeridesHoy() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${month}-${day}`;

  const query = `*[_type == "efemeride" && fecha match $today] | order(destacada desc, _createdAt desc) {
    _id,
    titulo,
    anio,
    descripcion,
    categoria,
    imagen,
    destacado
  }`;

  return await client.fetch(query, { today: todayStr });
}

// 👉 Efemérides por mes
export async function getEfemeridesPorMes(mes: number) {
  const query = `*[_type == "efemeride" && month(fecha) == $mes] | order(fecha asc, destacado desc) {
    _id,
    titulo,
    fecha,
    anio,
    descripcion,
    categoria,
    imagen
  }`;

  return await client.fetch(query, { mes });
}

// 👉 Búsqueda de noticias
export async function searchNews(query: string, limit = 10) {
  return client.fetch(
    `*[_type == "news" && defined(slug.current) && (title match $q || description match $q)] | order(_createdAt desc)[0...${limit}]{ 
      _id, 
      title, 
      "slug": slug.current,
      category,
      description,
      image,
      _createdAt
    }`,
    { q: `*${query}*` },
    { next: { revalidate: 0 } }
  );
}