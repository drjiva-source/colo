import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Script from "next/script";
import { RadioPlayer } from "@/components/RadioPlayer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "EL COLO SIN FILTRO - Noticias de El Colorado, Formosa",
  description: "Portal de noticias independiente de El Colorado, Formosa. Política, Economía, Cultura, Deportes y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${oswald.variable}`}>
        {children}
        
        {/* Radio Player */}
        <RadioPlayer />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QWQT2F9GGL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QWQT2F9GGL');
          `}
        </Script>
      </body>
    </html>
  );
}