// components/CategoriesBar.tsx

import Link from "next/link";

type Props = {
  categories: string[];
};

export function CategoriesBar({ categories }: Props) {
  return (
    <nav className="bg-gray-100 py-3 rounded-xl">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex gap-2 overflow-x-auto scrollbar-hide">
          {/* Opción "Todas" que lleva al home */}
          <li>
            <Link 
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full hover:bg-blue-600 hover:text-white transition whitespace-nowrap border border-gray-200"
            >
              Todas
            </Link>
          </li>
          
          {/* Categorías dinámicas */}
          {categories.map((category) => (
            <li key={category}>
              <Link 
                href={`/categoria/${encodeURIComponent(category)}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full hover:bg-blue-600 hover:text-white transition whitespace-nowrap border border-gray-200"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}