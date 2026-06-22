import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const streamUrl = searchParams.get('url');
  
  // Si no hay URL, usamos Radio Parque por defecto
  const targetUrl = streamUrl || 'https://ssl.radiosnethosting.com/index.php?port=8114';

  return NextResponse.redirect(targetUrl, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-cache',
    },
  });
}