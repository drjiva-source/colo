import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad - EL COLO SIN FILTRO",
  description: "Política de privacidad y protección de datos de El Colo Sin Filtro.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-600 font-oswald">
          POLÍTICA DE PRIVACIDAD
        </h1>

        <p className="text-sm text-gray-500 mb-8 text-center">
          Última actualización: 18 de junio de 2026
        </p>

        <div className="prose prose-red max-w-none space-y-6 text-gray-700">
          {/* Introducción */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              1. Introducción
            </h2>
            <p>
              En <strong>EL COLO SIN FILTRO</strong> (en adelante "el Sitio"), 
              con domicilio en El Colorado, Formosa, Argentina, nos comprometemos 
              a proteger la privacidad de nuestros usuarios. Esta Política de 
              Privacidad describe cómo recopilamos, usamos y protegemos la 
              información personal que nos proporcionas al utilizar nuestro sitio 
              web <strong>elcolosinfiltro.com.ar</strong>.
            </p>
            <p>
              El tratamiento de los datos personales se realiza en cumplimiento 
              de la <strong>Ley Nacional N° 25.326 de Protección de los Datos 
              Personales</strong> y su reglamentación.
            </p>
          </section>

          {/* Datos que recopilamos */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              2. Datos que recopilamos
            </h2>
            <p>Recopilamos los siguientes tipos de información:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Formulario de contacto:</strong> nombre, correo electrónico 
                y mensaje que nos envíes voluntariamente.
              </li>
              <li>
                <strong>Newsletter:</strong> correo electrónico cuando te suscribís 
                voluntariamente para recibir novedades.
              </li>
              <li>
                <strong>Datos de navegación:</strong> dirección IP aproximada, 
                tipo de navegador, páginas visitadas, tiempo de permanencia y 
                dispositivo utilizado (recopilados de forma anónima).
              </li>
              <li>
                <strong>Cookies:</strong> pequeños archivos que se almacenan en 
                tu dispositivo para mejorar la experiencia de navegación.
              </li>
            </ul>
          </section>

          {/* Uso de los datos */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              3. Uso de la información
            </h2>
            <p>Los datos recopilados se utilizan para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tus consultas y mensajes.</li>
              <li>Enviarte el newsletter, solo si te suscribiste voluntariamente.</li>
              <li>Mejorar el contenido y la experiencia del sitio.</li>
              <li>Analizar estadísticas de uso de forma anónima.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>
            <p className="mt-4 font-semibold">
              ⚠️ Nunca vendemos, alquilamos ni compartimos tus datos personales 
              con terceros con fines comerciales o de marketing.
            </p>
          </section>

          {/* Servicios de terceros */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              4. Servicios de terceros
            </h2>
            <p>
              Utilizamos los siguientes servicios que pueden procesar datos de 
              forma limitada:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vercel:</strong> alojamiento del sitio web.
              </li>
              <li>
                <strong>Cloudflare:</strong> seguridad, CDN y enrutamiento de 
                emails.
              </li>
              <li>
                <strong>Formspree:</strong> procesamiento del formulario de 
                contacto.
              </li>
              <li>
                <strong>Sanity:</strong> gestión de contenido del sitio.
              </li>
              <li>
                <strong>Google Analytics:</strong> análisis de tráfico (si está 
                habilitado).
              </li>
            </ul>
            <p>
              Cada uno de estos servicios cuenta con sus propias políticas de 
              privacidad.
            </p>
          </section>

          {/* Derechos del usuario */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              5. Derechos del usuario (ARCO)
            </h2>
            <p>
              De acuerdo con la Ley 25.326, tenés derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceder</strong> a tus datos personales.</li>
              <li><strong>Rectificar</strong> datos inexactos o incompletos.</li>
              <li><strong>Cancelar</strong> (eliminar) tus datos cuando lo desees.</li>
              <li><strong>Oponerte</strong> al tratamiento de tus datos.</li>
              <li><strong>Revocar</strong> el consentimiento para el newsletter en 
              cualquier momento (link de baja incluido en cada email).</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, escribinos a:{" "}
              <a
                href="mailto:contacto@elcolosinfiltro.com.ar"
                className="text-red-600 hover:underline font-semibold"
              >
                contacto@elcolosinfiltro.com.ar
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              6. Cookies
            </h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia de navegación. Podés 
              configurar tu navegador para rechazar cookies, aunque esto puede 
              afectar algunas funcionalidades del sitio.
            </p>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              7. Seguridad
            </h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para 
              proteger tus datos personales contra acceso no autorizado, pérdida 
              o alteración.
            </p>
          </section>

          {/* Menores */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              8. Menores de edad
            </h2>
            <p>
              El sitio no está dirigido a menores de 13 años. No recopilamos 
              intencionalmente datos de menores.
            </p>
          </section>

          {/* Cambios */}
          <section>
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              9. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar esta política en cualquier 
              momento. Los cambios se publicarán en esta misma página con la fecha 
              de actualización.
            </p>
          </section>

          {/* Contacto */}
          <section className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
            <h2 className="text-2xl font-bold text-red-600 font-oswald mb-4">
              10. Contacto
            </h2>
            <p>
              Ante cualquier consulta sobre esta Política de Privacidad, podés 
              contactarnos a:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:contacto@elcolosinfiltro.com.ar"
                  className="text-red-600 hover:underline font-semibold"
                >
                  contacto@elcolosinfiltro.com.ar
                </a>
              </li>
              <li>📍 El Colorado, Formosa, Argentina</li>
            </ul>
          </section>
        </div>

        {/* Botón volver */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}