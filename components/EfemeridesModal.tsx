// components/EfemeridesModal.tsx
'use client';

import { useState } from 'react';
import { urlFor } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export default function EfemeridesModal({ efemerides, hoy }: { efemerides: any[], hoy: string }) {
  const [selectedEfem, setSelectedEfem] = useState<any>(null);

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📅</span>
          <h3 className="font-bold text-blue-900 text-lg">
            Efemérides del {hoy}
          </h3>
        </div>

        <div className="space-y-4">
          {efemerides.slice(0, 2).map((efem: any) => (
            <button 
              key={efem._id} 
              onClick={() => setSelectedEfem(efem)}
              className="block w-full text-left bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition hover:border-blue-300 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Ver detalle: ${efem.titulo}`}
            >
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
            </button>
          ))}
        </div>

        <Link 
          href="/efemerides" 
          className="block mt-4 text-center text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline transition"
        >
          Ver más efemérides →
        </Link>
      </div>

      {/* MODAL */}
      {selectedEfem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEfem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedEfem(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition z-10"
            >
              ✕
            </button>
            
            {selectedEfem.imagen && (
              <div className="relative w-full h-48 md:h-56 rounded-t-2xl overflow-hidden">
                <Image
                  src={urlFor(selectedEfem.imagen).width(600).height(300).url()}
                  alt={selectedEfem.titulo}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-black text-blue-600">
                  {selectedEfem.anio}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedEfem.titulo}
              </h3>
              
              {selectedEfem.descripcion && (
                <p className="text-gray-600 leading-relaxed">
                  {selectedEfem.descripcion}
                </p>
              )}
              
              {selectedEfem.categoria && (
                <span className="inline-block mt-4 text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
                  {selectedEfem.categoria}
                </span>
              )}
            </div>
            
            <div className="px-6 pb-6">
              <button
                onClick={() => setSelectedEfem(null)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}