// components/EfemeridesWidget.tsx
import { getEfemeridesHoy } from "@/lib/sanity/queries";
import EfemeridesModal from "./EfemeridesModal";

export async function EfemeridesWidget() {
  console.log('📅 [Widget] Iniciando carga...');
  
  try {
    const efemerides = await getEfemeridesHoy();
    console.log('📅 [Widget] Efemérides encontradas:', efemerides?.length || 0);

    // Si no hay efemérides, mostramos un placeholder (NO null)
    if (!efemerides?.length) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-blue-800 font-bold mb-2">📅 Efemérides</p>
          <p className="text-sm text-blue-600">
            No hay efemérides cargadas para hoy
          </p>
          
          <a 
            href="/efemerides" 
            className="inline-block mt-3 text-xs font-medium text-blue-700 hover:underline"
          >
            Ver todas →
          </a>
        </div>
      );
    }

    const hoy = new Date().toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'long' 
    });

    return <EfemeridesModal efemerides={efemerides} hoy={hoy} />;
    
  } catch (error) {
    console.error('❌ [Widget] ERROR:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
        <p className="text-red-800 font-bold">⚠️ Error cargando efemérides</p>
        <p className="text-xs text-red-600 mt-1">Revisá la consola para más detalles</p>
      </div>
    );
  }
}