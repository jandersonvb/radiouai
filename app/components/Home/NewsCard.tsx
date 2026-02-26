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
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)] transition duration-300 ease-in-out hover:-translate-y-1 hover:border-[#d91e28]/40"
    >
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#d91e28] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {tag}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-zinc-900 transition group-hover:text-[#d91e28]">
          {title}
        </h3>
        <p className="mt-auto text-sm text-zinc-500">{date}</p>
      </div>
    </Link>
  );
}
