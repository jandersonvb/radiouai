// app/api/stream/route.ts
export async function GET() {
  // Recupera o PLS remoto
  const res = await fetch('https://www.radios.com.br/play/playlist/231140/playlist.pls');
  if (!res.ok) {
    return new Response('Erro ao obter playlist', { status: 502 });
  }
  const text = await res.text();
  const match = text.match(/^File1=(.+)$/m);
  if (!match) {
    return new Response('URL do stream não encontrada', { status: 500 });
  }
  const streamUrl = match[1];

  // Proxy do stream MP3
  const streamRes = await fetch(streamUrl);
  if (!streamRes.ok || !streamRes.body) {
    return new Response('Erro no stream de áudio', { status: 502 });
  }

  // Retorna o corpo como streaming com headers adequados
  return new Response(streamRes.body, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
