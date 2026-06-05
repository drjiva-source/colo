// lib/sanity/queries.ts
import { client } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { CATEGORIES, type CategorySlug } from "@/lib/constants";

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
  console.log('🔍 [Query] getFeaturedNews - INICIANDO');
  try {
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
      { next: { revalidate: 60 } }
    );
    console.log('✅ [Query] getFeaturedNews - Resultado:', result ? 'OK' : 'null');
    return result;
  } catch (error) {
    console.error('❌ [Query] ERROR en getFeaturedNews:', error);
    return null;
  }
}

// 👉 Tendencias (3 noticias)
export async function getTrendingNews(limit = 3) {
  console.log(`🔍 [Query] getTrendingNews - Buscando ${limit} noticias...`);
  try {
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
      { next: { revalidate: 60 } }
    );
    console.log(`✅ [Query] getTrendingNews - Encontradas:`, result?.length || 0);
    return result;
  } catch (error) {
    console.error('❌ [Query] ERROR en getTrendingNews:', error);
    return [];
  }
}

// 👉 Más Leídas (3 noticias)
export async function getMostReadNews(limit = 3) {
  console.log(`🔍 [Query] getMostReadNews - Buscando ${limit} noticias...`);
  try {
    const result = await client.fetch(
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
      { next: { revalidate: 60 } }
    );
    console.log(`✅ [Query] getMostReadNews - Encontradas:`, result?.length || 0);
    return result;
  } catch (error) {
    console.error('❌ [Query] ERROR en getMostReadNews:', error);
    return [];
  }
}

// 👉 Categorías unificadas (las 7 definidas en constants.ts)
export async function getAllCategories() {
  return CATEGORIES.map(cat => ({ name: cat.name, slug: cat.slug }));
}

// 👉 Noticias por categoría específica (VERSIÓN COMPATIBLE - SIN lower())
export async function getNewsByCategory(categorySlug: CategorySlug, limit = 10) {
  console.log(`🔍 [Query] getNewsByCategory - Buscando: ${categorySlug}`);
  
  // Mapeamos slug → nombre (ej: "locales" → "Locales")
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const categoryName = category?.name || categorySlug;

  // Query simple y 100% compatible con todas las versiones de GROQ
  const query = `*[_type == "news" && category == $category && defined(slug.current)] | order(_createdAt desc)[0...${limit}] {
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

  try {
    // revalidate: 0 para desarrollo: ve cambios al instante
    const result = await client.fetch(query, { category: categoryName }, { next: { revalidate: 0 } });
    
    console.log(`✅ [Query] Noticias en "${categoryName}":`, result?.length || 0);
    return result || [];
  } catch (error) {
    console.error(`❌ [Query] ERROR en getNewsByCategory:`, error);
    return [];
  }
}

// 👉 Noticias relacionadas
export async function getRelatedArticles(currentSlug: string, category: string, limit = 3) {
  try {
    const result = await client.fetch(
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
      { next: { revalidate: 60 } }
    );
    return result;
  } catch (error) {
    console.error('❌ [Query] ERROR en getRelatedArticles:', error);
    return [];
  }
}

// 👉 Efemérides del día actual (CORREGIDA - match flexible por fecha)
export async function getEfemeridesHoy() {
  console.log('🔍 [Query] getEfemeridesHoy - INICIANDO');
  
  try {
    const today = new Date();
    const mes = String(today.getMonth() + 1).padStart(2, '0');
    const dia = String(today.getDate()).padStart(2, '0');
    
    console.log(`📅 [Query] Buscando efemérides para: ${dia}/${mes}`);
    
    // Match flexible: busca cualquier fecha que termine en "-06-03"
    const query = `*[_type == "efemeride" && fecha match $fecha] | order(destacada desc, _createdAt desc) {
      _id,
      titulo,
      fecha,
      anio,
      descripcion,
      categoria,
      imagen,
      destacada
    }`;

    const result = await client.fetch(query, { 
      fecha: `*-${mes}-${dia}` // Ej: "*-06-03" → matchea "2024-06-03", "1990-06-03", etc.
    });
    
    console.log(`✅ [Query] getEfemeridesHoy - Encontradas:`, result?.length || 0);
    
    if (result?.length > 0) {
      console.log('📦 [Query] Primera efeméride:', {
        titulo: result[0].titulo,
        fecha: result[0].fecha,
        anio: result[0].anio
      });
    }
    
    return result;
  } catch (error) {
    console.error('❌ [Query] ERROR en getEfemeridesHoy:', error);
    return [];
  }
}

// 👉 Efemérides por mes
export async function getEfemeridesPorMes(mes: number) {
  console.log(`🔍 [Query] getEfemeridesPorMes - Mes: ${mes}`);
  try {
    const query = `*[_type == "efemeride" && month(fecha) == $mes] | order(fecha asc, destacada desc) {
      _id,
      titulo,
      fecha,
      anio,
      descripcion,
      categoria,
      imagen
    }`;

    const result = await client.fetch(query, { mes });
    console.log(`✅ [Query] getEfemeridesPorMes - Encontradas:`, result?.length || 0);
    return result;
  } catch (error) {
    console.error(`❌ [Query] ERROR en getEfemeridesPorMes (${mes}):`, error);
    return [];
  }
}

// 👉 Búsqueda de noticias
export async function searchNews(query: string, limit = 10) {
  console.log(`🔍 [Query] searchNews - Término: "${query}"`);
  try {
    const result = await client.fetch(
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
      { next: { revalidate: 60 } }
    );
    console.log(`✅ [Query] searchNews - Encontradas:`, result?.length || 0);
    return result;
  } catch (error) {
    console.error('❌ [Query] ERROR en searchNews:', error);
    return [];
  }
}