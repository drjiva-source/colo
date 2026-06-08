// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { AdBanner } from "@/components/AdBanner";
import { Footer } from "@/components/Footer";
import { RadioPlayer } from "@/components/RadioPlayer";

// ✅ Inter para interfaz (texto general, botones, etc.)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ Oswald para el logo "EL COLO SIN FILTRO"
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"], // SemiBold y Bold
  display: "swap",
  variable: "--font-oswald",
});

// ✅ Playfair Display para titulares de noticias (opcional)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"], // Bold, ExtraBold, Black
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "EL COLO SIN FILTRO | EL COLORADO FORMOSA",
  description: "Tu portal de noticias confiable.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
        
        {/* 🔝 Header Principal */}
        <Header />
        
        {/*  Banner Leaderboard */}
        <div className="w-full bg-gray-50 px-0">
          <AdBanner 
            variant="leaderboard"
            imageSrc="/ads/zz3-728x90.jpg"
            mobileImageSrc="/ads/zz3-320x100.jpg"
            href="https://zzautomores.com"
            label="Publicidad"
          />
        </div>
        
        {/* 📰 Contenido de las páginas */}
        <main className="container mx-auto py-8 px-4 min-h-screen pb-20">
          {children}
        </main>
        
        {/* 🔻 Footer y Radio */}
        <Footer />
        <RadioPlayer />
        
        <Analytics />
      </body>
    </html>
  );
}