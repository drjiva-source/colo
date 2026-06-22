import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Usar Edge Runtime para mejor compatibilidad

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const streamUrl = searchParams.get('url');
  
  if (!streamUrl) {
    return new NextResponse('URL de stream no proporcionada', { status: 400 });
  }

  try {
    // Hacer fetch al stream
    const response = await fetch(streamUrl, {
      method: 'GET',
      headers: {
        'Accept': 'audio/mpeg, audio/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Stream responded with ${response.status}`);
    }

    // Obtener el tipo de contenido del stream
    const contentType = response.headers.get('content-type') || 'audio/mpeg';

    // Crear headers de respuesta
    const headers = new Headers({
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });

    // Devolver el stream
    return new NextResponse(response.body, {
      headers,
    });
  } catch (error) {
    console.error('❌ Error en proxy de radio:', error);
    return new NextResponse(`Error al cargar el stream: ${error instanceof Error ? error.message : 'Unknown error'}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
    },
  });
}