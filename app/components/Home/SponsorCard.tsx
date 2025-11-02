// app/components/Home/SponsorCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

// Esta é a "forma" que o objeto do patrocinador terá
export type Sponsor = {
  name: string;
  href: string; // Link principal (site)
  logoUrl: string;
  whatsapp?: string; // Número com DDI (ex: 5535988881111)
  instagram?: string; // URL completo
  facebook?: string; // URL completo
};

type SponsorCardProps = {
  sponsor: Sponsor;
};

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 h-full">
      {/* Link principal (na imagem e nome) */}
      <Link
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
        title={`Visite o site de ${sponsor.name}`}
      >
        {/* Logo */}
        <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden bg-white">
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.name}
            fill
            className="object-contain p-2" // object-contain para logos
          />
        </div>
        
        {/* Nome do Patrocinador */}
        <h3 className="text-lg font-bold text-white mb-4 text-center line-clamp-1">
          {sponsor.name}
        </h3>
      </Link>

      {/* Ícones de Redes Sociais */}
      <div className="flex items-center justify-center gap-5 text-neutral-400 mt-auto">
        
        {/* Renderiza o ícone apenas se o link existir */}
        {sponsor.whatsapp && (
          <Link
            href={`https://wa.me/${sponsor.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 transition-colors"
            title="WhatsApp"
          >
            <FaWhatsapp size={24} />
          </Link>
        )}
        {sponsor.instagram && (
          <Link
            href={sponsor.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
            title="Instagram"
          >
            <FaInstagram size={24} />
          </Link>
        )}
        {sponsor.facebook && (
          <Link
            href={sponsor.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            title="Facebook"
          >
            <FaFacebookF size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}