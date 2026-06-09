// components/SplashScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Verificar si ya se mostró en esta sesión
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    // Ocultar después de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white animate-fade-out">
      {/* Fondo con imagen de la localidad */}
      <div className="absolute inset-0">
        <Image
          src="/splash-bg.jpg" // 👈 Tu foto de El Colorado
          alt="El Colorado - Formosa"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-800/90" />
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 p-8">
        {/* Logo */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 animate-bounce-slow">
          <Image
            src="/logo.png"
            alt="El Colo Sin Filtro"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-oswald font-bold text-white text-center tracking-tight drop-shadow-lg">
          EL COLO SIN FILTRO
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 text-center font-medium">
          EL COLORADO - FORMOSA
        </p>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}