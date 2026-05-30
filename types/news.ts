export type NewsCategory =
  | "Deportes"
  | "Tecnología"
  | "Mundo"
  | "Economía";

export type NewsArticle = {
  title: string;
  slug: string;
  category: NewsCategory;
  description: string;
  image: string;
  content?: string;
  createdAt?: string;
};