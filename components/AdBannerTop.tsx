// components/AdBannerTop.tsx
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
    <div className="w-full bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        {/* 🔹 Label pequeño arriba */}
        <div className="text-center mb-1">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            {label}
          </span>
        </div>
        
        {/* 🔹 Banner clickable */}
        <Link 
          href={href} 
          className="block relative w-full h-20 md:h-24 lg:h-28 rounded-lg overflow-hidden hover:opacity-90 transition-opacity group"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <Image
            src={imageSrc}
            alt="Publicidad"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="100vw"
            priority
          />
        </Link>
      </div>
    </div>
  );
}