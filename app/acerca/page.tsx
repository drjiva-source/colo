// app/acerca/page.tsx

import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Acerca de Nosotros",
  description: "Conoce la misión y visión de " + siteConfig.name,
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
          Sobre {siteConfig.name}
        </h1>
        <p className="text-lg text-slate-600">
          Periodismo independiente, riguroso y actualizado.
        </p>
      </header>

      {/* Contenido */}
      <div className="prose prose-lg prose-slate mx-auto">
        <p>
          Bienvenido a <strong>{siteConfig.name}</strong>. Somos un portal de noticias digital fundado con el objetivo de ofrecer información veraz, oportuna y de calidad a nuestros lectores.
        </p>
        
        <h2>Nuestra Misión</h2>
        <p>
          Informar con objetividad y profundidad sobre los acontecimientos más relevantes de la política, economía, tecnología y cultura, sirviendo como un puente entre los hechos y la ciudadanía.
        </p>

        <h2>Nuestro Equipo</h2>
        <p>
          Contamos con un equipo multidisciplinario de periodistas, editores y desarrolladores apasionados por la tecnología y la comunicación.
        </p>

        <hr className="my-8 border-slate-200" />

        <h3>Contacto</h3>
        <p>
          ¿Tienes una noticia, sugerencia o quieres anunciarte con nosotros?
        </p>
        <p>
           <a href="mailto:contacto@colonews.com" className="text-blue-600 hover:underline">contacto@colonews.com</a>
        </p>
      </div>

      {/* Volver */}
      <div className="mt-12 text-center">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}