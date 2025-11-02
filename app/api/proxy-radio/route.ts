// app/api/proxy-radio/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // use o fetch global, não node-fetch
  const upstream = await fetch('http://media.projesom.com.br:15910/canall10.mp3')
  if (!upstream.ok) {
    return new NextResponse('Bad gateway', { status: 502 })
  }

  const headers = {
    'Content-Type': 'audio/mpeg',
    'Cache-Control': 'public, max-age=0, s-maxage=60',
  }

  // agora upstream.body é um Web ReadableStream compatível
  return new NextResponse(upstream.body, { headers })
}
