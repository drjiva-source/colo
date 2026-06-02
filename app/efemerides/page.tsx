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
  let efemerides: any[] = [];
  
  try {
    efemerides = await client.fetch(`
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
  } catch (error) {
    console.error("❌ Error cargando efemérides:", error);
  }

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Agrupar efemérides por mes
  const efemeridesPorMes = efemerides.reduce((acc: any, efem: any) => {
    if (!efem.fecha) return acc;
    const mes = new Date(efem.fecha).getMonth();
    if (!acc[mes]) acc[mes] = [];
    acc[mes].push(efem);
    return acc;
  }, {} as Record<number, any[]>);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          📅 Efemérides
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Recordamos los hechos históricos, culturales y deportivos que marcaron nuestra historia
        </p>
      </div>

      {/* Contenido */}
      {Object.keys(efemeridesPorMes).length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-4">📭 No hay efemérides cargadas</p>
          <Link href="/" className="text-red-600 hover:text-red-800 font-medium">
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.keys(efemeridesPorMes).map((mesIndex) => {
            const mesNum = parseInt(mesIndex);
            return (
              <section key={mesIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Header del mes */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-5">
                  <h2 className="text-2xl md:text-3xl font-bold capitalize">
                    {meses[mesNum]}
                  </h2>
                </div>
                
                {/* Lista de efemérides */}
                <div className="divide-y divide-gray-100">
                  {efemeridesPorMes[mesNum].map((efem:any) => (
                    <article key={efem._id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex flex-col md:flex-row gap-5">
                        {/* Imagen */}
                        {efem.imagen && (
                          <div className="relative w-full md:w-40 h-40 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={urlFor(efem.imagen).width(200).height(200).url()}
                              alt={efem.titulo}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Contenido */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl font-bold text-red-600">
                              {efem.anio}
                            </span>
                            {efem.fecha && (
                              <span className="text-sm text-gray-500">
                                {new Date(efem.fecha).getDate()} de {meses[mesNum]}
                              </span>
                            )}
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
                            <span className="inline-block mt-3 text-xs uppercase tracking-wider font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                              {efem.categoria}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}