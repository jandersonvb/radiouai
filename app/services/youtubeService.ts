/* eslint-disable @typescript-eslint/no-explicit-any */
// app/services/youtubeService.ts

export type YoutubeVideoItem = {
    id: string; // ID do vídeo (necessário para o embed)
    title: string;
    publishedAt: string;
    thumbnailUrl: string; // Thumbnail oficial do YouTube
    duration: string; // Ex: "PT1H48M58S" (você precisará formatar isso)
};

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCeQ3FubHgPF1FcRfSI1-U8g'; // Substitua pelo ID real do seu canal

/**
 * Função para buscar os vídeos mais recentes de um canal
 */
export async function fetchLatestVideos(): Promise<YoutubeVideoItem[]> {
    if (!API_KEY) {
        console.error("YouTube API Key não configurada!");
        return []; // Retorna array vazio se não houver chave
    }

    // Endpoint para buscar os itens mais recentes do canal
    const PLAYLIST_ID = CHANNEL_ID.replace('UC', 'UU'); // O canal ID sempre começa com UC, o ID de upload (playlist de vídeos) começa com UU

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=4`;

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalida a cada 1 hora (3600s)
        
        if (!response.ok) {
            console.error(`Erro ao buscar vídeos: ${response.statusText}`);
            return [];
        }

        const data = await response.json();

        // Mapeia o resultado para o formato esperado
        return data.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('pt-BR', { dateStyle: 'medium' }),
            // Usamos a thumbnail de melhor qualidade
            thumbnailUrl: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
            duration: "", // A duração requer uma segunda chamada (Content Details) ou uma biblioteca externa, mas simplificaremos para esta resposta.
        }));

    } catch (error) {
        console.error("Erro na requisição da YouTube API:", error);
        return [];
    }
}