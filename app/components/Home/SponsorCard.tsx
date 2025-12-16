// app/components/Home/SponsorCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import type { Sponsor } from "@/app/data/sponsors";

// Re-exportar o tipo para manter compatibilidade
export type { Sponsor } from "@/app/data/sponsors";

type SponsorCardProps = {
  sponsor: Sponsor;
};

export function SponsorCard({ sponsor }: SponsorCardProps) {
  const hasSocialLinks = sponsor.whatsapp || sponsor.instagram || sponsor.facebook;

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-3">
      {/* Logo com link para página interna do patrocinador */}
      <Link
        href={`/patrocinadores/${sponsor.slug}`}
        title={sponsor.name}
        className="block"
      >
        <div className="relative h-48 w-48 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.name}
            fill
            className="object-cover p-2"
          />
        </div>
      </Link>

      {/* Redes sociais sempre visíveis */}
      {hasSocialLinks && (
        <div className="flex items-center justify-center gap-3">
          {sponsor.whatsapp && (
            <Link
              href={`https://wa.me/${sponsor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-500 hover:scale-110 transition-all duration-300 bg-neutral-800 p-2.5 rounded-full"
              title="WhatsApp"
            >
              <FaWhatsapp size={22} />
            </Link>
          )}
          {sponsor.instagram && (
            <Link
              href={sponsor.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 hover:scale-110 transition-all duration-300 bg-neutral-800 p-2.5 rounded-full"
              title="Instagram"
            >
              <FaInstagram size={22} />
            </Link>
          )}
          {sponsor.facebook && (
            <Link
              href={sponsor.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 hover:scale-110 transition-all duration-300 bg-neutral-800 p-2.5 rounded-full"
              title="Facebook"
            >
              <FaFacebookF size={22} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
