// types/index.ts

// 1. Definimos las categorías permitidas para evitar errores de escritura
export type Category = 
  | "Deportes" 
  | "Tecnología" 
  | "Economía" 
  | "Ciencia"
  | "Política";

// 2. Definimos la estructura principal de una Noticia
export interface NewsArticle {
  slug: string;          // URL única (ej: argentina-gana)
  title: string;         // Título principal
  category: Category;    // Categoría
  description: string;   // Resumen corto (para la Home)
  content?: string;      // Contenido completo (para la página de detalle)
  image?: string;        // URL de la imagen (opcional)
  createdAt: string;     // Fecha de publicación
  score: number;         // Puntaje para "Trending"
  views: number;         // Cantidad de vistas para "Más leídas"
}