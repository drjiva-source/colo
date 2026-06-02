// schemas/efemeride.js (en tu carpeta de schemas de Sanity)
export default {
  name: 'efemeride',
  title: 'Efemérides',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título del Evento',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'fecha',
      title: 'Fecha (día y mes)',
      type: 'date',
      options: {
        dateFormat: 'MM-DD',
        calendarTodayLabel: 'Hoy'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'anio',
      title: 'Año del suceso',
      type: 'number',
      description: 'Ej: 1810, 1982, etc.'
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Histórica', value: 'historica' },
          { title: 'Deportiva', value: 'deportiva' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Política', value: 'politica' },
          { title: 'Otras', value: 'otras' }
        ]
      }
    },
    {
      name: 'imagen',
      title: 'Imagen (opcional)',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'destacada',
      title: 'Marcar como destacada',
      type: 'boolean',
      description: 'Aparecerá primero en la lista'
    }
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'fecha'
    }
  }
}