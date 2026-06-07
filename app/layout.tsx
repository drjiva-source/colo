// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { AdBanner } from "@/components/AdBanner";
import { Footer } from "@/components/Footer";
import { RadioPlayer } from "@/components/RadioPlayer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        
        {/* 🔝 Header Principal */}
        <Header />
        
        {/*  Banner Leaderboard (Solo en este archivo) */}
        <div className="w-full flex justify-center py-2 bg-gray-50">
          <AdBanner 
            variant="leaderboard"
            imageSrc="/ads/zz3-728x90.jpg"      // ✅ Desktop
            mobileImageSrc="/ads/zz3-320x100.jpg" // ✅ Móvil
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