// lib/sanity/schema.ts
import { type SchemaTypeDefinition, defineField, defineType } from "sanity";
import efemeride from './efemeride';
import { adBannerSchema } from './adBanner';

// ============================================
// Schema de Noticias
// ============================================
export const newsSchema = defineType({
  name: "news",
  title: "Noticias",
  type: "document",
  fields: [
    defineField({ 
      name: "title", 
      title: "Título", 
      type: "string", 
      validation: (rule) => rule.required() 
    }),
    defineField({ 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      options: { source: "title" } 
    }),
    defineField({ 
      name: "category", 
      title: "Categoría", 
      type: "string", 
      options: { 
        list: [
          { title: "Política", value: "Política" },
          { title: "Economía", value: "Economía" },
          { title: "Cultura", value: "Cultura" },
          { title: "Deportes", value: "Deportes" },
          { title: "Policiales", value: "Policiales" },
          { title: "Locales", value: "Locales" },
          { title: "Opinión", value: "Opinión" },
        ] 
      } 
    }),
    defineField({ 
      name: "description", 
      title: "Descripción", 
      type: "text" 
    }),
    defineField({ 
      name: "content", 
      title: "Contenido", 
      type: "array", 
      of: [{ type: "block" }] 
    }),
    defineField({ 
      name: "image", 
      title: "Imagen Principal", 
      type: "image", 
      options: { hotspot: true } 
    }),
    defineField({ 
      name: "score", 
      title: "Score", 
      type: "number", 
      initialValue: 0 
    }),
    defineField({ 
      name: "views", 
      title: "Vistas", 
      type: "number", 
      initialValue: 0 
    }),
    defineField({ 
      name: "createdAt", 
      title: "Fecha", 
      type: "datetime", 
      initialValue: () => new Date().toISOString() 
    }),
  ],
});

// ============================================
// 🎵 Schema de Configuración de Radio
// ============================================
export const radioStreamSchema = defineType({
  name: "radioStream",
  title: "Configuración de Radio",
  type: "document",
  fields: [
    defineField({
      name: "isActive",
      title: "¿Radio Activa?",
      type: "boolean",
      description: "Desactivar para ocultar el reproductor de radio",
      initialValue: true,
    }),
    defineField({
      name: "streamUrl",
      title: "URL del Stream Principal (Lunes a Sábado)",
      type: "string",
      description: "Stream de música durante la semana",
      initialValue: "https://ssl.radiosnethosting.com/index.php?port=8114",
      validation: (rule) => rule.required().error("La URL del stream es requerida"),
    }),
    defineField({
      name: "stationName",
      title: "Nombre de la Emisora (Lunes a Sábado)",
      type: "string",
      description: "Nombre que se muestra de lunes a sábado",
      initialValue: "La Nación Música 104.9",
    }),
    defineField({
      name: "tagline",
      title: "Descripción / Tagline (Lunes a Sábado)",
      type: "text",
      rows: 2,
      description: "Descripción que se muestra de lunes a sábado",
      initialValue: "Música las 24 horas",
    }),
    defineField({
      name: "sundayStreamUrl",
      title: "URL del Stream Dominical",
      type: "string",
      description: "Stream alternativo para los domingos (Radioterapia)",
      initialValue: "http://37.157.242.101:14456",
    }),
    defineField({
      name: "sundayStationName",
      title: "Nombre de la Emisora (Domingos)",
      type: "string",
      description: "Nombre que se muestra los domingos",
      initialValue: "Radioterapia",
    }),
    defineField({
      name: "sundayTagline",
      title: "Descripción / Tagline (Domingos)",
      type: "text",
      rows: 2,
      description: "Descripción que se muestra los domingos",
      initialValue: "Programa especial dominical",
    }),
  ],
});

// ============================================
// 📢 Schema de Banners Publicitarios
// ============================================
// (Definido en ./adBanner.ts e importado al inicio)

// ============================================
// ✅ Export para Sanity config (importado como `schema`)
// ============================================
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    newsSchema,
    efemeride,
    radioStreamSchema,
    adBannerSchema, // 👈 Banner publicitario agregado
  ],
};

// ============================================
// ✅ Export para sanity.config.ts (importado como `schemaTypes`)
// ============================================
export const schemaTypes = [
  newsSchema, 
  efemeride, 
  radioStreamSchema, 
  adBannerSchema, // 👈 Banner publicitario agregado
];