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
  // Para leaderboard usamos max-w para centrarlo y que no sea gigante en PC
  const sizeConfig = {
    leaderboard: { w: "w-full max-w-[728px] mx-auto" }, 
    skyscraper: { w: "w-[300px]", h: "h-[600px]" },
    rectangle: { w: "w-full md:w-[400px]", h: "h-[250px]" }, // 400px en PC, completo en móvil
  };

  const size = sizeConfig[variant];

  // Lógica para Leaderboard (Responsive Nativo)
  // Usamos width/height fijos y dejamos que CSS escale la imagen proporcionalmente.
  // Esto evita que se recorten los bordes en móviles.
  if (variant === 'leaderboard' && imageSrc) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider text-center">{label}</span>
        <div className={`${size.w} rounded-lg shadow-sm overflow-hidden`}>
           <Link href={href || "#"} target={href ? "_blank" : "_self"} rel="noopener noreferrer">
             <Image
                src={imageSrc}
                alt="Publicidad"
                width={728}
                height={90}
                className="w-full h-auto" // ← Clave: Mantiene proporción y no corta
                priority // ← Mejora la carga al ser el primer elemento visible
             />
           </Link>
        </div>
      </div>
    );
  }

  // Lógica para Skyscraper y Rectangle (Fill)
  const content = imageSrc ? (
    <div className={`relative w-full ${size.h} group`}>
      <Image 
        src={imageSrc} 
        alt="Publicidad" 
        fill 
        sizes={variant === 'skyscraper' ? '300px' : '100vw'}
        className={`rounded-lg shadow-sm transition-transform group-hover:scale-[1.02] object-cover`} 
      />
    </div>
  ) : (
    // Placeholder "Vendible"
    <div className={`w-full ${size.h} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 text-center gap-2`}>
      <span className="text-3xl">📢</span>
      <span className="font-bold text-gray-500 uppercase tracking-wider text-sm">Espacio Disponible</span>
      <span className="text-xs text-gray-400">
        {variant === 'leaderboard' ? '728 x 90' : variant === 'skyscraper' ? '300 x 600' : '400 x 250'}
      </span>
      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded mt-2 font-medium">¡Tu marca aquí!</span>
    </div>
  );

  // Wrapper clickable
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    href ? (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block w-full relative group">
        {children}
      </Link>
    ) : (
      <div className="block w-full relative">{children}</div>
    )
  );

  return (
    <div className={`flex flex-col gap-2 ${variant === 'skyscraper' ? 'sticky top-24' : ''}`}>
      {/* Etiqueta pequeña */}
      {!imageSrc && <span className="text-[10px] text-gray-400 uppercase tracking-wider text-center">{label}</span>}
      
      <Wrapper>
        <div className={`${size.w} overflow-hidden relative bg-white shadow-sm rounded-lg`}>
          {content}
        </div>
      </Wrapper>
    </div>
  );
}