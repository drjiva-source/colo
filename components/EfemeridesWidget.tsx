// components/EfemeridesWidget.tsx
import { getEfemeridesHoy } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export async function EfemeridesWidget() {
  const efemerides = await getEfemeridesHoy();

  if (!efemerides?.length) return null;

  const hoy = new Date().toLocaleDateString('es-AR', { 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📅</span>
        <h3 className="font-bold text-blue-900 text-lg">
          Efemérides del {hoy}
        </h3>
      </div>

      <div className="space-y-4">
        {efemerides.slice(0, 2).map((efem: any) => (
          <div key={efem._id} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition">
            {efem.imagen && (
              <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
                <Image
                  src={urlFor(efem.imagen).width(300).height(150).url()}
                  alt={efem.titulo}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start gap-2 mb-1">
              <span className="text-2xl font-bold text-blue-600">
                {efem.anio}
              </span>
            </div>
            
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {efem.titulo}
            </h4>
            
            {efem.descripcion && (
              <p className="text-xs text-gray-600 line-clamp-2">
                {efem.descripcion}
              </p>
            )}
            
            {efem.categoria && (
              <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {efem.categoria}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Link a página completa */}
      <Link 
        href="/efemerides" 
        className="block mt-4 text-center text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline transition"
      >
        Ver más efemérides →
      </Link>
    </div>
  );
}