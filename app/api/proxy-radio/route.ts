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
// // pages/api/proxy-radio.ts (Pages Router)
// import type { NextApiRequest, NextApiResponse } from 'next'
// import http from 'http'

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Repassa o request diretamente ao servidor de rádio
//   http.get('http://media.projesom.com.br:15910/canall10.mp3', proxied => {
//     res.writeHead(proxied.statusCode || 200, {
//       'Content-Type': 'audio/mpeg',
//       'Cache-Control': 'no-cache',
//     })
//     proxied.pipe(res)  // pipe já faz o streaming contínuo
//   }).on('error', err => {
//     res.status(502).send('Bad gateway')
//     console.error('Error fetching radio stream:', err)
//   })
// }
