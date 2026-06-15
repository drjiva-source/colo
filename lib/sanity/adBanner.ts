// lib/sanity/adBanner.ts
import { defineField, defineType } from "sanity";

export const adBannerSchema = defineType({
  name: "adBanner",
  title: "Banners Publicitarios",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título Interno",
      type: "string",
      description: "Ej: 'Crishop Octubre' (Solo para tu referencia)",
    }),
    defineField({
      name: "image",
      title: "Imagen Desktop",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Imagen Móvil (Opcional)",
      type: "image",
      options: { hotspot: true },
      description: "Versión adaptada para celulares",
    }),
    defineField({
      name: "url",
      title: "Link de Destino",
      type: "url",
      description: "Ej: https://crishop.com",
    }),
    defineField({
      name: "label",
      title: "Etiqueta",
      type: "string",
      initialValue: "Publicidad",
      options: {
        list: ["Publicidad", "Patrocinado", "Destacado", "Última Hora"],
      },
    }),
    defineField({
      name: "position",
      title: "Ubicación en el Sitio",
      type: "string",
      options: {
        list: [
          { title: "Header (Leaderboard)", value: "header" },
          { title: "Sidebar (Rectangle)", value: "sidebar-rect" },
          { title: "Sidebar (Skyscraper)", value: "sidebar-sky" },
          { title: "In-Article (Rectangle)", value: "in-article" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "¿Activo?",
      type: "boolean",
      initialValue: true,
      description: "Desactivar para ocultar sin borrar el banner",
    }),
  ],
});