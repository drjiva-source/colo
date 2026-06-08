// app/publicidad/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicidad | El Colo Sin Filtro",
  description: "Llegá a miles de lectores en El Colorado y Formosa. Conocé nuestras opciones de publicidad digital.",
};

export default function PublicidadPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen bg-white">
      
      {/* Header */}
      <div className="mb-12 text-center border-b border-gray-200 pb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-red-600 mb-4 inline-block transition">
          ← Volver al inicio
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Publicidad en <span className="text-red-600">El Colo</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Conectá tu marca con una audiencia local activa, comprometida y en crecimiento.
        </p>
      </div>

      {/* Intro */}
      <section className="mb-16 text-center">
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Somos el portal de noticias de referencia en <strong>El Colorado, Formosa</strong>. 
          Si tu negocio quiere llegar a vecinos reales, con contenido relevante y en un entorno de confianza, 
          este es el lugar indicado.
        </p>
      </section>

      {/* Beneficios */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          ¿Por qué publicitar con nosotros?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg text-red-600 mb-2">Audiencia Local</h3>
            <p className="text-gray-600 text-sm">
              Llegás directamente a residentes de El Colorado y la región. Sin desperdicio, 100% foco en tu mercado.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold text-lg text-red-600 mb-2">Multiplataforma</h3>
            <p className="text-gray-600 text-sm">
              Tu marca en el portal web, la radio en vivo y nuestras redes sociales. Máxima exposición integrada.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-lg text-red-600 mb-2">Contenido Nativo</h3>
            <p className="text-gray-600 text-sm">
              Ofrecemos formatos que se integran naturalmente con nuestras noticias, generando mayor engagement.
            </p>
          </div>

        </div>
      </section>

      {/* Formatos Disponibles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Formatos Disponibles
        </h2>
        <div className="space-y-6">
          
          {/* Banner Superior */}
          <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:border-red-300 transition">
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg h-20 md:h-24 flex items-center justify-center text-gray-400 text-sm font-medium">
                728x90 px
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-bold text-gray-900 mb-1">Banner Superior (Header)</h3>
              <p className="text-gray-600 text-sm mb-3">
                Visibilidad máxima: aparece en la parte superior de todas las páginas. Ideal para marcas que buscan impacto.
              </p>
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                Desde $15.000/mes
              </span>
            </div>
          </div>

          {/* Banner Lateral */}
          <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:border-red-300 transition">
            <div className="md:w-1/3">
              <div className="bg-gray-100 rounded-lg h-32 md:h-48 flex items-center justify-center text-gray-400 text-sm font-medium">
                300x250 px
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-bold text-gray-900 mb-1">Banner Lateral (Sidebar)</h3>
              <p className="text-gray-600 text-sm mb-3">
                Acompaña la lectura de las noticias. Perfecto para promociones, servicios locales o eventos.
              </p>
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                Desde $25.000/mes
              </span>
            </div>
          </div>

          {/* Contenido Patrocinado */}
          <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:border-red-300 transition">
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="text-4xl">📰</div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-bold text-gray-900 mb-1">Nota Patrocinada</h3>
              <p className="text-gray-600 text-sm mb-3">
                Creamos contenido editorial de calidad sobre tu marca, producto o servicio. Se publica como noticia con etiqueta "Publicidad".
              </p>
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                Consultar
              </span>
            </div>
          </div>

          {/* Mención en Radio */}
          <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:border-red-300 transition">
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="text-4xl">📻</div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-bold text-gray-900 mb-1">Mención en Radio </h3>
              <p className="text-gray-600 text-sm mb-3">
                Tu marca mencionada en vivo durante la transmisión de radio. Incluye lectura de cuña y logo en el reproductor web.
              </p>
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                Consultar
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Audiencia (Placeholder) */}
      <section className="mb-16 bg-blue-50 p-8 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Nuestra Audiencia
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-blue-600 mb-1">+12K</div>
            <div className="text-sm text-gray-600">Seguidores en Instagram</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">Radio en vivo</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-600 mb-1">📍</div>
            <div className="text-sm text-gray-600">El Colorado + Formosa</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-600 mb-1">📈</div>
            <div className="text-sm text-gray-600">Crecimiento constante</div>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          * Métricas actualizadas mensualmente. Solicitá nuestro media kit completo.
        </p>
      </section>

      {/* CTA Final */}
      <section className="text-center border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Listo para anunciar tu marca?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Contactanos para recibir nuestro media kit con tarifas, especificaciones técnicas y casos de éxito.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:publicidad@elcolosinfiltro.com" 
            className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition shadow-lg hover:shadow-xl"
          >
            ✉️ Escribinos por Email
          </a>
          <a 
            href="https://wa.me/5493704638xxx" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl"
          >
            💬 WhatsApp
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Respondemos en menos de 24hs hábiles.
        </p>
      </section>

    </div>
  );
}