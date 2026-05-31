// lib/sanity/schema.ts
import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "news",
  title: "Noticias",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "category", title: "Categoría", type: "string", options: { list: ["Política", "Deportes", "Economía", "Tecnología", "Cultura", "Sociedad"] } }),
    defineField({ name: "description", title: "Descripción", type: "text" }),
    defineField({ name: "content", title: "Contenido", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", title: "Imagen Principal", type: "image", options: { hotspot: true } }),
    defineField({ name: "score", title: "Score", type: "number", initialValue: 0 }),
    defineField({ name: "views", title: "Vistas", type: "number", initialValue: 0 }),
    defineField({ name: "createdAt", title: "Fecha", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
});

export const schemaTypes = [newsSchema];