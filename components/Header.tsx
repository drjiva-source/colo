// components/Header.tsx

'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quickLinks = [
    'Inicio',
    'Tendencias',
    'Política',
    'Economía',
    'Deportes',
    'Tecnología',
    'Acerca de',
  ];

  return (
    <header className="w-full font-sans">
      
      {/* 🔝 BARRA SUPERIOR: Logo y Acciones */}
      <div className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Botón Menú (Izquierda) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-primary/90 rounded transition"
            aria-label="Abrir menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* LOGO CENTRAL */}
          <Link href="/" className="flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-wide uppercase text-primary-foreground">
              {siteConfig.name}
            </h1>
            <span className="text-[10px] md:text-xs text-primary-foreground/80 tracking-widest uppercase mt-1">
              {siteConfig.description.split(' ').slice(0, 3).join(' ')}...
            </span>
          </Link>

          {/* Botón Buscar/Usuario (Derecha) */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-primary/90 rounded transition" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-primary/90 rounded transition hidden md:block" aria-label="Perfil">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 🔽 BARRA INFERIOR: Navegación Rápida */}
      <div className="bg-card border-b border-border py-2 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-hide">
          <nav className="flex items-center justify-center gap-4 md:gap-6 min-w-max">
            {quickLinks.map((link) => (
              <Link 
                key={link}
                href={link === 'Inicio' ? '/' : link === 'Acerca de' ? '/acerca' : `/categoria/${link}`}
                className="text-xs md:text-sm font-medium text-muted hover:text-primary uppercase tracking-wide transition-colors whitespace-nowrap"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Menú Desplegable (Móvil) */}
      {isMenuOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-card border-b border-border shadow-lg z-50 p-4 md:hidden">
          <nav className="flex flex-col gap-4 text-center">
            {quickLinks.map((link) => (
              <Link 
                key={link}
                href={link === 'Inicio' ? '/' : link === 'Acerca de' ? '/acerca' : `/categoria/${link}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-foreground py-2 border-b border-border hover:text-primary transition"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}