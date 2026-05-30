// config/site.ts

export const siteConfig = {
  name: "EL COLORADO NOTICIAS",
  description: "El Colorado - Formosa",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    twitter: "https://twitter.com/tuportal",
    github: "https://github.com/tuusuario/colo-news",
  },
  // Aquí podrías agregar categorías, colores, etc. en el futuro
} as const;

export type SiteConfig = typeof siteConfig;