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
    <section className="w-full p-6 bg-neutral-900 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Nossos Patrocinadores</h2>
        <Link
          href="/seja-um-patrocinador"
          className="text-sm text-yellow-400 hover:underline"
        >
          Seja um
        </Link>
      </div>

      {/* MODIFICADO: Grade ajustada para os cards maiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DUMMY_SPONSORS.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}