import Link from "next/link";
import Image from "next/image";

export function NewsCard({ article }: { article: any }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition bg-white"
    >
      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">
        <span className="text-sm font-semibold uppercase text-blue-600">
          {article.category}
        </span>

        <h3 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition">
          {article.title}
        </h3>

        <p className="text-gray-600 mt-3 leading-7">
          {article.description}
        </p>
      </div>
    </Link>
  );
}