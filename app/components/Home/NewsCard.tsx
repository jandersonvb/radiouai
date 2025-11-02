// app/components/Home/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  href: string;
  imageUrl: string;
  tag: string;
  title: string;
  date: string;
};

export function NewsCard({
  href,
  imageUrl,
  tag,
  title,
  date,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-neutral-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1"
    >
      {/* Seção da Imagem */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Tag da Notícia */}
        <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold uppercase px-2 py-1 rounded-md">
          {tag}
        </span>
      </div>

      {/* Seção do Conteúdo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-400 mt-auto">{date}</p>
      </div>
    </Link>
  );
}