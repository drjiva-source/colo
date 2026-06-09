// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { AdBanner } from "@/components/AdBanner";
import { Footer } from "@/components/Footer";
import { RadioPlayer } from "@/components/RadioPlayer";
import { SplashScreen } from "@/components/SplashScreen";

// ✅ Inter para texto general
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ Oswald para el logo
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-oswald",
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
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-background text-foreground`}>
        
        {/* 🔥 Splash Screen de bienvenida */}
        <SplashScreen />
        
        {/* 🔝 Header */}
        <Header />
        
        {/* 📢 Banner Leaderboard */}
        <div className="w-full bg-gray-50 px-0">
          <AdBanner 
            variant="leaderboard"
            imageSrc="/ads/zz3-728x90.jpg"
            mobileImageSrc="/ads/zz3-320x100.jpg"
            href="https://zzautomores.com"
            label="Publicidad"
          />
        </div>
        
        {/* 📰 Contenido principal */}
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