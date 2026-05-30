// app/loading.tsx

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      
      {/* Skeleton del Hero (Noticia destacada) */}
      <div className="mb-10">
        <div className="bg-gray-300 h-[400px] w-full rounded-3xl mb-4"></div>
        <div className="bg-gray-300 h-8 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>

      {/* Skeleton de la barra de categorías */}
      <div className="flex gap-4 mb-10 overflow-hidden">
        <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
        <div className="bg-gray-300 h-8 w-24 rounded-full"></div>
      </div>

      {/* Skeleton de Secciones (Tendencias / Más leídas) */}
      <div className="mb-10">
        <div className="bg-gray-300 h-8 w-48 rounded mb-6"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tarjeta 1 */}
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
          {/* Tarjeta 2 */}
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
          {/* Tarjeta 3 */}
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
        </div>
      </div>
      
      {/* Otra sección igual */}
       <div className="mb-10">
        <div className="bg-gray-300 h-8 w-48 rounded mb-6"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
        </div>
      </div>

    </main>
  );
}