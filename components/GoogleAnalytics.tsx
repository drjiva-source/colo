// components/GoogleAnalytics.tsx

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

export function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Función para enviar pageview a GA4
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // @ts-ignore - gtag es global, inyectado por el script
    window.gtag?.('event', 'page_view', {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return (
    <>
      {/* Script base de GA4 - se carga después de la hidratación */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}