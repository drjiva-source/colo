// lib/sanity/schema.ts
import { type SchemaTypeDefinition, defineField, defineType } from "sanity";
import efemeride from './efemeride';

// Schema de Noticias
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

// ✅ Export para Sanity config (importado como `schema`)
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    newsSchema,
    efemeride,
  ],
};

// ✅ Export para sanity.config.ts (importado como `schemaTypes`)
export const schemaTypes = [newsSchema, efemeride];