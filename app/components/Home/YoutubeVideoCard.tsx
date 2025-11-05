// app/components/Home/YoutubeVideoCard.tsx
import { PlayCircle } from "lucide-react"; // Certifique-se de que lucide-react está instalado
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
      onClick={onClick} // Usa o botão para capturar o clique
      className="group flex flex-col bg-neutral-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-yellow-400/20 text-left"
    >
      {/* Seção da Imagem */}
      <div className="relative w-full h-48 bg-neutral-800">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />

        {/* Ícone de Play (Overlay Fixo) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity duration-300">
          <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:text-yellow-400 transition-all duration-300" />
        </div>

      </div>

      {/* Seção do Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-400">
          {title}
        </h3>
        {/* Detalhes da publicação */}
        <p className="text-sm text-neutral-400 mt-auto">{streamDetails}</p>
      </div>
    </button>
  );
}