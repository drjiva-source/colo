// components/AdBannerTop.tsx
'use client';

import Link from "next/link";
import Image from "next/image";

interface AdBannerTopProps {
  imageSrc: string;
  href?: string;
  label?: string;
}

export function AdBannerTop({ 
  imageSrc, 
  href = "#", 
  label = "Publicidad" 
}: AdBannerTopProps) {
  return (
    // Contenedor limpio. Sin fondos internos que choquen con el diseño del auspiciante.
    <div className="w-full bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        
        {/* Label discreto */}
        <div className="text-center mb-1">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            {label}
          </span>
        </div>
        
        {/* ✅ Caja del Banner: La imagen ocupará el 100% de este espacio */}
        <Link 
          href={href} 
          className="block relative w-full h-24 md:h-28 lg:h-32 overflow-hidden group"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <Image
            src={imageSrc}
            alt="Publicidad"
            fill
            // ✅ object-cover: Rellena toda la caja sin dejar huecos. 
            // Recorta sutilmente los bordes si la proporción no coincide exactamente, 
            // garantizando que SIEMPRE se vea completo y sin deformaciones.
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="100vw"
            priority
          />
        </Link>
      </div>
    </div>
  );
}