import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const streamUrl = searchParams.get('url');
  
  if (!streamUrl) {
    return new NextResponse('URL de stream no proporcionada', { status: 400 });
  }

  try {
    console.log('📻 Proxy conectando a:', streamUrl);

    const response = await fetch(streamUrl, {
      method: 'GET',
      headers: {
        'Accept': 'audio/*, */*',
        'Icy-MetaData': '1',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error('❌ Error del stream:', response.status, response.statusText);
      throw new Error(`Stream error: ${response.status}`);
    }

    // Obtener el tipo de contenido real del stream
    const contentType = response.headers.get('content-type') || 'audio/aac';
    
    // Crear headers optimizados
    const headers = new Headers({
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range, Icy-MetaData',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Accept-Ranges': 'bytes',
      'Connection': 'keep-alive',
    });

    // Copiar headers de metadata del stream si existen
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey.includes('icy-') || 
          lowerKey === 'content-length' || 
          lowerKey === 'content-range') {
        headers.set(key, value);
      }
    });

    console.log('✅ Stream conectado:', contentType);

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error('❌ Error en proxy:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new NextResponse(
      JSON.stringify({ error: 'Failed to connect to stream', details: errorMessage }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range, Icy-MetaData',
    },
  });
}