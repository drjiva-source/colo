// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// 🔹 Fuente optimizada (puedes cambiarla si usas otra)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// 🔹 Metadatos globales (SEO + OpenGraph)
export const metadata: Metadata = {
  title: {
    default: "Colo News | Noticias de Argentina",
    template: "%s | Colo News",
  },
  description: "Portal de noticias actualizado con las últimas novedades en deportes, política, economía y más.",
  keywords: ["noticias", "argentina", "deportes", "política", "economía", "actualidad", "sanity cms"],
  authors: [{ name: "Colo News" }],
  openGraph: {
    title: "Colo News",
    description: "Tu fuente confiable de noticias en Argentina.",
    url: "https://colo-jwab.vercel.app",
    siteName: "Colo News",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 👈 Crea esta imagen en /public/ (1200x630px)
        width: 1200,
        height: 630,
        alt: "Colo News - Portada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colo News",
    description: "Tu fuente confiable de noticias en Argentina.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${inter.className} antialiased bg-background text-foreground`}>
        {/* 🔹 Tu Header/Navbar puede ir aquí si lo tienes */}
        
        {/* 🔹 Contenido de las páginas */}
        {children}
        
        {/* 🔹 Tu Footer puede ir aquí si lo tienes */}

        {/* 🔍 Vercel Analytics (solo se activa en producción, 0 impacto en local) */}
        <Analytics />
      </body>
    </html>
  );
}