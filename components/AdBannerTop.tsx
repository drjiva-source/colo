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
    // ✅ Fondo NEGRO para combinar con tu banner
    <div className="w-full bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-2">
        
        {/* Label pequeño */}
        <div className="text-center mb-1">
          <span className="text-[10px] uppercase tracking-wider text-white/60 font-medium bg-white/10 px-2 py-0.5 rounded inline-block">
            {label}
          </span>
        </div>
        
        {/* ✅ Banner con object-contain para NO cortar el texto */}
        <Link 
          href={href} 
          className="block relative w-full h-20 md:h-24 lg:h-28 rounded-lg overflow-hidden hover:opacity-90 transition-opacity group bg-black"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <Image
            src={imageSrc}
            alt="Publicidad"
            fill
            // ✅ object-contain: Muestra la imagen entera sin recortes
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
            sizes="100vw"
            priority
          />
        </Link>
      </div>
    </div>
  );
}