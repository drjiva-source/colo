import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - EL COLO SIN FILTRO",
  description: "Contactate con El Colo Sin Filtro. Envianos tu consulta, noticia o comentario.",
};

export default function ContactoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center font-oswald">
        CONTACTO
      </h1>

      <div className="max-w-2xl mx-auto">
        {/* Información de contacto */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-red-600 font-oswald">
            ¿Querés comunicarte con nosotros?
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-red-600 text-2xl">📧</div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-gray-600">
                  Escribinos a:{" "}
                  <a
                    href="mailto:contacto@elcolosinfiltro.com.ar"
                    className="text-red-600 hover:underline font-semibold"
                  >
                    contacto@elcolosinfiltro.com.ar
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-red-600 text-2xl">📻</div>
              <div>
                <h3 className="font-bold text-lg">Radio</h3>
                <p className="text-gray-600">FM 105.3 La Nuestra - El Colorado, Formosa</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-red-600 text-2xl">📍</div>
              <div>
                <h3 className="font-bold text-lg">Ubicación</h3>
                <p className="text-gray-600">El Colorado, Formosa, Argentina</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto con Formspree */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-red-600 font-oswald">
            Envianos un mensaje
          </h2>

          <form 
            action="https://formspree.io/f/xeewwbqd"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                Asunto *
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="¿Sobre qué querés escribirnos?"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Escribí tu mensaje..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              Enviar mensaje
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            * Campos obligatorios
          </p>
        </div>
      </div>
    </div>
  );
}