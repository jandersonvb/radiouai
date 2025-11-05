// app/components/YoutubeEmbedModal.tsx
import { X } from "lucide-react";

type YoutubeEmbedModalProps = {
  videoId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export function YoutubeEmbedModal({ videoId, isOpen, onClose }: YoutubeEmbedModalProps) {
  if (!isOpen || !videoId) return null;

  // URL do embed do YouTube
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    // Overlay de fundo
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4" 
      onClick={onClose}
    >
      {/* Container do Modal */}
      <div 
        className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl mx-2 sm:mx-0"
        onClick={(e) => e.stopPropagation()} // Impede que clicar dentro feche o modal
      >
        {/* Botão de Fechar */}
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 sm:top-0 sm:right-0 sm:m-3 z-10 p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          aria-label="Fechar Vídeo"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Player Embarcado (iframe) */}
        {/* Usamos a técnica de aspect ratio (16:9) para o iframe */}
        <div className="relative pt-[56.25%]"> {/* 56.25% é 9/16 */}
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Vídeo do YouTube"
          />
        </div>
      </div>
    </div>
  );
}