// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 🔹 Marca & Descripción */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1 rounded font-bold text-lg">CN</div>
              <span className="font-bold text-xl text-foreground">Colo News</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tu fuente confiable de noticias en Argentina. Información actualizada las 24 horas.
            </p>
          </div>

          {/*  Enlaces Rápidos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Secciones</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition">Inicio</Link></li>
              <li><Link href="/categoria/deportes" className="hover:text-primary transition">Deportes</Link></li>
              <li><Link href="/categoria/politica" className="hover:text-primary transition">Política</Link></li>
              <li><Link href="/categoria/economia" className="hover:text-primary transition">Economía</Link></li>
            </ul>
          </div>

          {/*  Legal & Redes */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Síguenos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://instagram.com/tu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Instagram</a></li>
              <li><a href="https://twitter.com/tu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">X (Twitter)</a></li>
              <li><a href="https://facebook.com/tu_pagina" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/*  Barra Inferior */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Colo News. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-primary transition">Privacidad</Link>
            <Link href="/terminos" className="hover:text-primary transition">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}