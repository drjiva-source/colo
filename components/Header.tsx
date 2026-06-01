// components/Header.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 🔹 HEADER ROJO ESTILO NOTICIERO */}
      <header className="sticky top-0 z-50 w-full bg-red-600 text-white shadow-md">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
          
          {/* 🔸 Lado Izquierdo: Menú + Logo + Títulos */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Menú Hamburguesa (Visible solo en móvil para no estorbar) */}
            <button 
              className="md:hidden p-1 hover:bg-red-700 rounded transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo (Asegúrate de tener /public/logo.png) */}
              <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Logo El Colo Sin Filtro" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Títulos */}
              <div className="flex flex-col leading-none">
                <h1 className="text-lg md:text-2xl font-black tracking-tight text-white group-hover:text-gray-100 transition-colors">
                  EL COLO SIN FILTRO
                </h1>
                <span className="text-[10px] md:text-xs font-medium text-white/90 tracking-widest mt-1">
                  EL COLORADO - FORMOSA
                </span>
              </div>
            </Link>
          </div>

          {/* 🔸 Lado Derecho: Búsqueda y Usuario */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Icono Búsqueda */}
            <button className="p-2 hover:bg-red-700 rounded-full transition" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            
            {/* Icono Usuario */}
            <button className="p-2 hover:bg-red-700 rounded-full transition hidden sm:block" aria-label="Mi Cuenta">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </div>

        {/* 🔸 Menú Móvil (Se despliega al hacer clic) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-red-700 border-t border-red-800 px-4 py-4 space-y-3 text-white">
            <Link href="/" className="block text-sm font-medium hover:text-white/80 py-2 border-b border-red-600" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <Link href="/categoria/deportes" className="block text-sm font-medium hover:text-white/80 py-2 border-b border-red-600" onClick={() => setMobileMenuOpen(false)}>Deportes</Link>
            <Link href="/categoria/politica" className="block text-sm font-medium hover:text-white/80 py-2 border-b border-red-600" onClick={() => setMobileMenuOpen(false)}>Política</Link>
            <Link href="/categoria/economia" className="block text-sm font-medium hover:text-white/80 py-2" onClick={() => setMobileMenuOpen(false)}>Economía</Link>
          </div>
        )}
      </header>
    </>
  );
}