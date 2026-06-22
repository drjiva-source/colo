// components/Header.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-red-600 text-white shadow-lg shadow-red-900/20">
        <div className="container mx-auto flex h-20 md:h-24 items-center justify-between px-4">
          
          {/* Lado Izquierdo: Menú + Logo + Títulos */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Menú Hamburguesa (Móvil) */}
            <button 
              className="md:hidden p-1 hover:bg-red-700 rounded transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-3 md:gap-5 group">
              <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Logo El Colo Sin Filtro" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Títulos en 2 líneas */}
              <div className="flex flex-col leading-none">
                <h1 className="font-oswald text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-gray-100 transition-colors">
                  EL COLO
                </h1>
                <h1 className="font-oswald text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-gray-100 transition-colors">
                  SIN FILTRO
                </h1>
                <span className="text-[10px] md:text-xs font-medium text-white/90 tracking-widest mt-1">
                  EL COLORADO - FORMOSA
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-red-700 rounded-md transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            
            {/* 🎵 Botón Radio En Vivo (Desktop) */}
            <a 
              href="#radio-player"
              className="flex items-center gap-1.5 bg-white text-red-600 px-3 py-1.5 rounded-full font-bold text-xs hover:bg-gray-100 transition shadow-sm border border-red-100 ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
                <circle cx="12" cy="12" r="2"/>
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
                <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>
              </svg>
              <span className="whitespace-nowrap">RADIO EN VIVO</span>
            </a>
            
            <span className="text-red-300 mx-1">|</span>
            
            {/* Link de Efemérides */}
            <Link
              href="/efemerides"
              className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-red-700 rounded-md transition-colors flex items-center gap-1"
            >
              📅 Efemérides
            </Link>
          </nav>

          {/* Lado Derecho: Búsqueda y Usuario */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-red-700 rounded-full transition" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-red-700 rounded-full transition hidden sm:block" aria-label="Mi Cuenta">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-red-700 border-t border-red-800 px-4 py-4 space-y-3">
            
            {/* 🎵 Botón Radio En Vivo (Móvil - Grande y visible) */}
            <a 
              href="#radio-player"
              className="flex items-center justify-center gap-2 bg-white text-red-600 px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition w-full shadow-md border-2 border-red-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
                <circle cx="12" cy="12" r="2"/>
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
                <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>
              </svg>
              <span>ESCUCHAR RADIO EN VIVO</span>
            </a>
            
            <div className="border-t border-red-600/50 my-2"></div>
            
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="block px-3 py-3 text-sm font-medium text-white hover:bg-red-800 rounded-md transition-colors border-b border-red-600/50 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            
            {/* Link de Efemérides (Móvil) */}
            <Link
              href="/efemerides"
              className="block px-3 py-3 text-sm font-medium text-white hover:bg-red-800 rounded-md transition-colors border-b border-red-600/50 last:border-0 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              📅 Efemérides
            </Link>
          </div>
        )}
      </header>
    </>
  );
}