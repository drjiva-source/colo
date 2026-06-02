// components/CategoriesBar.tsx
'use client';

import Link from "next/link";

// ✅ Espera objetos { name, slug } en lugar de strings
interface Category {
  name: string;
  slug: string;
}

interface CategoriesBarProps {
  categories: Category[];
}

export function CategoriesBar({ categories }: CategoriesBarProps) {
  if (!categories?.length) return null;

  return (
    <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          key={cat.slug} // ✅ Usar slug como key (único)
          href={`/categoria/${cat.slug}`} // ✅ Usar slug para la URL
          className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition whitespace-nowrap"
        >
          {cat.name} {/* ✅ Renderizar SOLO el nombre, no el objeto */}
        </Link>
      ))}
    </nav>
  );
}