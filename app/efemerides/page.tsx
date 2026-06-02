// app/efemerides/page.tsx
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Efemérides | El Colo Sin Filtro",
  description: "Recordamos los hechos históricos más importantes de cada día"
};

export default async function EfemeridesPage() {
  const efemerides = await client.fetch(`
    *[_type == "efemeride"] | order(fecha asc, destacado desc) {
      _id,
      titulo,
      fecha,
      anio,
      descripcion,
      categoria,
      imagen
    }
  `);

  // Agrupar por mes
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const efemeridesPorMes = efemerides.reduce((acc: any, efem: any) => {
    const mes = new Date(efem.fecha).getMonth();
    if (!acc[mes]) acc[mes] = [];
    acc[mes].push(efem);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📅 Efemérides
        </h1>
        <p className="text-gray-600">
          Recordamos los hechos que marcaron la historia
        </p>
      </div>

      <div className="space-y-8">
        {Object.keys(efemeridesPorMes).map((mesIndex: any) => (
          <section key={mesIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
              <h2 className="text-2xl font-bold capitalize">
                {meses[mesIndex]}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {efemeridesPorMes[mesIndex].map((efem: any) => (
                <article key={efem._id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    {efem.imagen && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={urlFor(efem.imagen).width(200).height(200).url()}
                          alt={efem.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-blue-600">
                          {efem.anio}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(efem.fecha).getDate()} de {meses[mesIndex]}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {efem.titulo}
                      </h3>
                      
                      {efem.descripcion && (
                        <p className="text-gray-600 leading-relaxed">
                          {efem.descripcion}
                        </p>
                      )}
                      
                      {efem.categoria && (
                        <span className="inline-block mt-3 text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {efem.categoria}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}