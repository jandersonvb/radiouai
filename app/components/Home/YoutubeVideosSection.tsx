// app/components/Home/YoutubeVideosSection.tsx
"use client";

import { YoutubeVideoCard } from "./YoutubeVideoCard";
import { fetchLatestVideos, YoutubeVideoItem } from "@/app/services/youtubeService";
import React, { useEffect, useState } from "react";
import { YoutubeEmbedModal } from "../YoutubeEmedModal/YoutubeEmbedModal";
import { useRouter } from "next/navigation";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@radiouai"; 

export function YoutubeVideosSection() {
  const [videos, setVideos] = useState<YoutubeVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const router = useRouter();

  const handleToChannel = () => {
    router.push(YOUTUBE_CHANNEL_URL);
  };

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
      <section className="w-full h-64 flex items-center justify-center rounded-3xl border border-zinc-200 bg-white shadow-[0_12px_35px_-25px_rgba(0,0,0,0.5)]">
        <p className="text-zinc-600 text-sm md:text-base px-4 text-center">
          Carregando últimos vídeos...
        </p>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="w-full space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
            Últimos vídeos
        </h2>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-[#d91e28]/25 bg-[#d91e28]/5 px-4 py-2 text-sm font-semibold text-[#d91e28] transition hover:bg-[#d91e28]/10"
          onClick={handleToChannel}
        >
          Ver canal completo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {videos.map((item) => (
          <YoutubeVideoCard
            key={item.id}
            imageUrl={item.thumbnailUrl}
            title={item.title}
            streamDetails={`Publicado em ${item.publishedAt}`}
            onClick={() => setSelectedVideoId(item.id)}
          />
        ))}
      </div>

      <YoutubeEmbedModal
        videoId={selectedVideoId}
        isOpen={!!selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </section>
  );
}
