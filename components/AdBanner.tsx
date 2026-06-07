// components/AdBanner.tsx
import Link from "next/link";
import Image from "next/image";

interface AdBannerProps {
  variant: "leaderboard" | "skyscraper" | "rectangle";
  imageSrc?: string;
  mobileImageSrc?: string;
  href?: string;
  label?: string;
}

export function AdBanner({ variant, imageSrc, mobileImageSrc, href, label = "Publicidad" }: AdBannerProps) {
  
  const sizeConfig = {
    leaderboard: { w: "", h: "" },
    skyscraper: { w: "w-[300px]", h: "h-[600px]" },
    rectangle: { w: "w-full md:w-[400px]", h: "h-[250px]" },
  };

  const size = sizeConfig[variant];

  // 👉 LÓGICA LEADERBOARD (CON FORZADO CSS)
  if (variant === 'leaderboard') {
    return (
      <div className="w-full flex flex-col items-center justify-center px-2 py-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">{label}</span>
        
        {/* 🖥️ DESKTOP: Se oculta siempre en móvil, se muestra SIEMPRE en pantallas md+ */}
        {imageSrc && (
          <div className="hidden md:!block w-full max-w-[728px]">
            <Link href={href || "#"} target={href ? "_blank" : "_self"} rel="noopener noreferrer">
              <Image
                src={imageSrc}
                alt="Publicidad Desktop"
                width={728}
                height={90}
                className="w-full h-auto rounded-lg shadow-sm"
                priority
              />
            </Link>
          </div>
        )}

        {/* 📱 MÓVIL: Se muestra siempre en móvil, se oculta SIEMPRE en pantallas md+ */}
        {mobileImageSrc && (
          <div className="block md:!hidden w-full max-w-[320px]">
            <Link href={href || "#"} target={href ? "_blank" : "_self"} rel="noopener noreferrer">
              <Image
                src={mobileImageSrc}
                alt="Publicidad Móvil"
                width={320}
                height={100}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </Link>
          </div>
        )}
      </div>
    );
  }

  // 👉 LÓGICA SKYSCRAPER Y RECTANGLE
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
    <div className={`w-full ${size.h} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 text-center gap-2`}>
      <span className="text-3xl"></span>
      <span className="font-bold text-gray-500 uppercase tracking-wider text-sm">Espacio Disponible</span>
      <span className="text-xs text-gray-400">
        {variant === 'skyscraper' ? '300 x 600' : '400 x 250'}
      </span>
    </div>
  );

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
      {!imageSrc && <span className="text-[10px] text-gray-400 uppercase tracking-wider text-center">{label}</span>}
      
      <Wrapper>
        <div className={`${size.w} overflow-hidden relative bg-white shadow-sm rounded-lg mx-auto`}>
          {content}
        </div>
      </Wrapper>
    </div>
  );
}