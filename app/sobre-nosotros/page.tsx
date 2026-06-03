// app/sobre-nosotros/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | El Colo Sin Filtro",
  description: "Periodismo independiente, verificado y sin filtros. Conocé nuestra misión y compromiso con la verdad.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen bg-white">
      
      {/* Header */}
      <div className="mb-12 text-center border-b border-gray-200 pb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-red-600 mb-4 inline-block transition">
          ← Volver al inicio
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Sobre <span className="text-red-600">Nosotros</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Periodismo independiente, verificado y sin filtros.
        </p>
      </div>

      {/* Contenido Editorial */}
      <article className="text-gray-700 leading-relaxed space-y-6">
        <p className="text-lg md:text-xl">
          Somos un portal de periodismo digital que nació con una premisa clara: <strong className="text-gray-900">el periodismo debe buscar la verdad antes que complacer.</strong> Somos un medio digital independiente que apuesta por la información verificada y el análisis responsable, alejándonos del sensacionalismo para ofrecer una lectura crítica y profunda de la actualidad.
        </p>
        
        <p className="text-lg md:text-xl">
          Nuestro compromiso es con un lector exigente que no se conforma con el dato suelto, sino que demanda contexto para comprender las causas y consecuencias de lo que sucede a su alrededor. Aquí, <strong className="text-gray-900">el rigor periodístico y la calidad de las fuentes estarán siempre por encima de la velocidad o el impacto fácil.</strong>
        </p>
        
        <p className="text-lg md:text-xl">
          La independencia editorial no es para nosotros una simple declaración de principios, sino nuestra única brújula. Trabajamos con absoluta transparencia y con un respeto genuino por la inteligencia de nuestra audiencia, convencidos de que <strong className="text-gray-900">informar con honestidad es el único camino para construir una opinión genuina y una sociedad más libre.</strong>
        </p>
      </article>

      {/* Cierre / CTA */}
      <div className="mt-16 pt-10 border-t border-gray-200 text-center">
        <p className="text-gray-600 mb-6 text-lg">
          ¿Tenés una noticia, sugerencia o querés sumar tu voz a este proyecto?
        </p>
        <Link 
          href="/contacto" 
          className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg"
        >
          Contactanos →
        </Link>
      </div>

    </div>
  );
}