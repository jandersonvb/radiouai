// app/components/Home/YoutubeVideosSection.tsx
'use client'; // Necessário para usar useState e useEffect

import Link from "next/link";
import { YoutubeVideoCard } from "./YoutubeVideoCard";
import { fetchLatestVideos, YoutubeVideoItem } from "@/app/services/youtubeService"; // Use a importação relativa correta
import React, { useEffect, useState } from 'react';
import { YoutubeEmbedModal } from "../YoutubeEmedModal/YoutubeEmbedModal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Informações do seu canal (Busque o ID correto para a variável de ambiente)
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@radiouai"; 
const CHANNEL_NAME = "Markinhos Vilas Boas | direto de Itajubá"; 

export function YoutubeVideosSection() {
  const [videos, setVideos] = useState<YoutubeVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const router = useRouter();


  const handleToChannel = () => {
    router.push(YOUTUBE_CHANNEL_URL);
  }

  // 1. Efeito para buscar os vídeos ao carregar o componente
  useEffect(() => {
    async function loadVideos() {
      const latestVideos = await fetchLatestVideos();
      setVideos(latestVideos);
      setLoading(false);
    }
    loadVideos();
  }, []);

  if (loading) {
    return (
      <section className="w-full h-64 flex items-center justify-center bg-neutral-900 rounded-lg">
        <p className="text-white text-sm md:text-base px-4 text-center">Carregando últimos vídeos...</p>
      </section>
    );
  }
  
  // Se não houver vídeos (ex: erro na API), não exibe a seção
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
            Últimos vídeos
        </h2>
        
        <Button 
          rel="noopener noreferrer"
          className="text-xs md:text-sm text-yellow-400 hover:underline w-full sm:w-auto"
          onClick={handleToChannel}
        >
          Ver canal completo
        </Button>
      </div>

      {/* Grid para os Cards de Vídeo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {videos.map((item) => (
          <YoutubeVideoCard
            key={item.id}
            imageUrl={item.thumbnailUrl}
            title={item.title}
            streamDetails={`Publicado em ${item.publishedAt}`}
            onClick={() => setSelectedVideoId(item.id)} // Passa o ID para abrir o modal
          />
        ))}
      </div>
      
      {/* 2. O Modal para assistir o vídeo */}
      <YoutubeEmbedModal
        videoId={selectedVideoId}
        isOpen={!!selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />

    </section>
  );
}
