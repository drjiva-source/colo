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

  // 👉 LÓGICA LEADERBOARD
  if (variant === 'leaderboard') {
    return (
      <div className="w-full flex flex-col items-center justify-center px-2 py-2">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">{label}</span>
        
        {/* Desktop */}
        {imageSrc && (
          <div className="hidden md:!block w-full max-w-[1280px]">
            <Link href={href || "#"} target={href ? "_blank" : "_self"} rel="noopener noreferrer">
              <Image
                src={imageSrc}
                alt="Publicidad Desktop"
                width={728}
                height={90}
                className="w-full h-auto"
                priority
              />
            </Link>
          </div>
        )}

        {/* Móvil */}
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

    // 👉 LÓGICA RECTANGLE (Blindada contra aplastamiento)
  if (variant === 'rectangle') {
    return (
      <div className="w-full mx-auto flex-shrink-0">
        {!imageSrc && !mobileImageSrc && (
          <span className="text-[10px] text-gray-400 uppercase tracking-wider text-center block mb-2">{label}</span>
        )}
        
        {/* Desktop: 400x250 */}
        {imageSrc && (
          <div className="hidden md:block relative w-full h-[250px] group">
            <Link href={href || "#"} className="block w-full h-full" rel="noopener noreferrer">
              <Image 
                src={imageSrc}
                alt="Publicidad Desktop"
                fill
                sizes="400px"
                className="rounded-lg shadow-sm object-cover"
              />
            </Link>
          </div>
        )}

        {/* Móvil: Fallback a imageSrc si no hay mobileImageSrc */}
        {(mobileImageSrc || imageSrc) && (
          <div className="block md:hidden relative w-full h-[180px] group">
            <Link href={href || "#"} className="block w-full h-full" rel="noopener noreferrer">
              <Image 
                src={mobileImageSrc || imageSrc}
                alt="Publicidad Móvil"
                fill
                sizes="100vw"
                className="rounded-lg shadow-sm object-cover"
              />
            </Link>
          </div>
        )}

        {/* Fallback placeholder */}
        {!imageSrc && !mobileImageSrc && (
          <div className="w-full h-[250px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <span className="text-3xl">📢</span>
            <span className="font-bold text-gray-500 uppercase tracking-wider text-sm mt-2">Espacio Disponible</span>
            <span className="text-xs text-gray-400">400 x 250</span>
          </div>
        )}
      </div>
    );
  }

  // 👉 LÓGICA SKYSCRAPER (se mantiene igual)
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
      <span className="text-3xl">📢</span>
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