// lib/sanity/queries.ts
import { client } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

// Configura el generador de URLs de imágenes
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

// 👉 Más Leídas (3 noticias) - ✅ ESTA FALTABA ANTES
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

// 👉 Categorías únicas - ✅ ESTA ES LA QUE CAUSA EL ERROR SI FALTA
export async function getAllCategories() {
  console.log("🔍 [QUERY] getAllCategories - Obteniendo categorías...");
  
  const cats = await client.fetch(`*[_type == "news" && defined(category)].category`);
  const unique = [...new Set(cats)].filter(Boolean);
  
  console.log("📦 [QUERY] Categorías encontradas:", unique);
  return unique;
}