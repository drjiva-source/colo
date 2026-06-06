// components/AdBanner.tsx
import Link from "next/link";
import Image from "next/image";

interface AdBannerProps {
  variant: "leaderboard" | "skyscraper" | "rectangle";
  imageSrc?: string;
  href?: string;
  label?: string;
}

export function AdBanner({ variant, imageSrc, href, label = "Publicidad" }: AdBannerProps) {
  // Configuración de tamaños
  const sizes = {
    leaderboard: "100vw",
    skyscraper: "300px",
    rectangle: "100vw",
  };

  const sizeConfig = {
    leaderboard: { w: "w-full", h: "h-[90px] max-w-[728px]" },
    skyscraper: { w: "w-[300px]", h: "h-[600px]" },
    rectangle: { w: "w-[600px]", h: "h-[250px]" },
  };

  const size = sizeConfig[variant];

  // Contenido visual
  const content = imageSrc ? (
    <div className="relative w-full h-full group">
      <Image 
        src={imageSrc} 
        alt="Publicidad" 
        fill 
        sizes={sizes[variant]} // ✅ Agregamos el prop sizes
        className="object-cover rounded-lg shadow-sm transition-transform group-hover:scale-[1.02]" 
      />
    </div>
  ) : (
    // Placeholder "Vendible"
    <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 text-center gap-2">
      <span className="text-3xl">📢</span>
      <span className="font-bold text-gray-500 uppercase tracking-wider text-sm">Espacio Disponible</span>
      <span className="text-xs text-gray-400">{variant === 'leaderboard' ? '728 x 90' : variant === 'skyscraper' ? '300 x 600' : '300 x 250'}</span>
      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-2 font-medium">¡Tu marca aquí!</span>
    </div>
  );

  // Wrapper clickable
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    href ? (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
        {children}
      </Link>
    ) : (
      <div className="block w-full h-full relative">{children}</div>
    )
  );

  return (
    <div className={`flex flex-col gap-2 ${variant === 'skyscraper' ? 'sticky top-24' : ''}`}>
      {/* Etiqueta pequeña */}
      <span className="text-[10px] text-gray-400 uppercase tracking-wider text-center">{label}</span>
      
      <Wrapper>
        <div className={`${size.w} ${size.h} overflow-hidden relative bg-white shadow-sm rounded-lg`}>
          {content}
        </div>
      </Wrapper>
    </div>
  );
}