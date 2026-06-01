// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { AdBannerTop } from "@/components/AdBannerTop";
import { Footer } from "@/components/Footer"; // 👈 Importa el Footer

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
        
        <Header />
         {/* 🔹 Banner Publicitario Full-Width */}
        <AdBannerTop 
          imageSrc="/ads/banner-top-728x90.jpg"  // 👈 Tu imagen en /public/ads/
          href="https://tu-cliente-o-patrocinante.com"
          label="Patrocinado"
        />
        
        <main className="container mx-auto py-8 px-4 min-h-screen">
          {children}
        </main>
        
        <Footer /> {/* 👈 Aquí se renderiza el footer en TODAS las páginas */}
        
        <Analytics />
      </body>
    </html>
  );
}