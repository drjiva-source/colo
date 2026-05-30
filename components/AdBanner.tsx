// components/AdBanner.tsx

import Image from 'next/image';

type AdBannerProps = {
  variant?: 'rectangle' | 'skyscraper';
  imageSrc: string; // ✅ Ahora es obligatorio (sin valor por defecto)
  href?: string;
  label?: string;
};

export function AdBanner({
  variant = 'rectangle',
  imageSrc,
  href = '#',
  label = 'Publicidad',
}: AdBannerProps) {
  const config = variant === 'skyscraper' 
    ? { width: 300, height: 600, containerClass: 'h-[600px]' } 
    : { width: 300, height: 250, containerClass: 'h-[250px]' };

  return (
    <div className="relative w-full max-w-[300px] mx-auto group">
      <span className="absolute -top-2 left-4 z-20 px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
        {label}
      </span>

      <a 
        href={href} 
        className="relative block w-full bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        <div className={`relative w-full ${config.containerClass}`}>
          <Image
            src={imageSrc}
            alt={`Banner ${label}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            unoptimized
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>
    </div>
  );
}