// app/components/Home/SponsorsSection.tsx
import Link from "next/link";
// IMPORTANDO O NOVO TIPO E O NOVO COMPONENTE
import { Sponsor, SponsorCard } from "./SponsorCard";

// DADOS DE EXEMPLO ATUALIZADOS com redes sociais
const DUMMY_SPONSORS: Sponsor[] = [
  {
    name: "Padaria Pão Quente",
    href: "#",
    logoUrl: "https://picsum.photos/seed/sponsor1/200/100",
    whatsapp: "5535988881111",
    instagram: "https://instagram.com/padaria",
    facebook: "https://facebook.com/padaria",
  },
  {
    name: "Academia Fitness Total",
    href: "#",
    logoUrl: "https://picsum.photos/seed/sponsor2/200/100",
    whatsapp: "5535988882222",
    instagram: "https://instagram.com/academia",
  },
  {
    name: "Loja de Roupas Estilo",
    href: "#",
    logoUrl: "https://picsum.photos/seed/sponsor3/200/100",
    facebook: "https://facebook.com/loja",
  },
  {
    name: "Restaurante Sabor da Terra",
    href: "#",
    logoUrl: "https://picsum.photos/seed/sponsor4/200/100",
    whatsapp: "5535988883333",
    instagram: "https://instagram.com/restaurante",
  },
];

export function SponsorsSection() {
  return (
    // <section className="w-full p-4 sm:p-6 bg-neutral-900 rounded-lg">
    //   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 sm:mb-6">
    <section className="w-full px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Nossos Patrocinadores</h2>
        <Link
          href="/seja-um-patrocinador"
          className="text-sm text-yellow-400 hover:underline whitespace-nowrap"
        >
          Seja um
        </Link>
      </div>

      {/* Grade responsiva: 1 coluna mobile, 2 em tablet, 4 em desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {DUMMY_SPONSORS.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}