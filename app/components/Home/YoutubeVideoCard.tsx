// app/components/Home/YoutubeVideoCard.tsx
import { PlayCircle } from "lucide-react";
import Image from "next/image";

export type YoutubeVideoCardProps = {
  imageUrl: string; // URL da thumbnail
  title: string;
  streamDetails: string; // Ex: "52 visualizações • Transmitido há 13 horas"
  onClick?: () => void; // Acao para abrir modal
};

export function YoutubeVideoCard({
  imageUrl,
  title,
  streamDetails,
  onClick,
}: YoutubeVideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)] transition duration-300 ease-in-out hover:-translate-y-1 hover:border-[#d91e28]/40"
    >
      <div className="relative h-48 w-full bg-zinc-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300">
          <PlayCircle className="h-10 w-10 text-white/90 drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:text-[#ffd1d4]" />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="mb-2 line-clamp-2 text-base md:text-lg font-bold text-zinc-900 transition group-hover:text-[#d91e28]">
          {title}
        </h3>
        <p className="mt-auto text-xs md:text-sm text-zinc-500">{streamDetails}</p>
      </div>
    </button>
  );
}
