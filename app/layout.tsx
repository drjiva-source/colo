// app/layout.tsx

import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics"; // 👈 Importamos
import "./globals.css";

// Configuración de Fuentes
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

// Metadatos Globales
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Solo cargamos GA si tenemos el ID (producción)
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect para mejorar rendimiento de GA */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body 
        className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        
        {/* 🔝 HEADER */}
        <Header />

        {/*  CONTENIDO PRINCIPAL */}
        <main className="grow w-full max-w-7xl mx-auto px-4 py-12 lg:py-16">
          {children}
        </main>

        {/* 🔻 FOOTER */}
        <Footer />

        {/* 📊 GOOGLE ANALYTICS (Solo si existe el ID) */}
        {gaId && <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />}

      </body>
    </html>
  );
}