import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(
    'https://ssl.radiosnethosting.com/index.php?port=8114',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    }
  );
}