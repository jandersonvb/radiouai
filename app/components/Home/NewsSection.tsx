// app/components/Home/NewsSection.tsx
import Link from "next/link";
import { NewsCard } from "./NewsCard"; // Importando o novo componente

// Dados de exemplo que você pode substituir
const DUMMY_NEWS = [
  {
    href: "/noticias/prefeitura-anuncia-novo-projeto",
    imageUrl: "https://picsum.photos/seed/noticia1/600/400",
    tag: "Itajubá",
    title: "Prefeitura anuncia novo projeto de revitalização para o centro",
    date: "02 de Novembro, 2025",
  },
  {
    href: "/noticias/time-local-vence-campeonato",
    imageUrl: "https://picsum.photos/seed/noticia2/600/400",
    tag: "Esportes",
    title: "Time local vence campeonato regional em final emocionante",
    date: "01 de Novembro, 2025",
  },
  {
    href: "/noticias/festival-de-musica-agita-regiao",
    imageUrl: "https://picsum.photos/seed/noticia3/600/400",
    tag: "Cultura",
    title: "Festival de música agita a região e atrai turistas",
    date: "31 de Outubro, 2025",
  },
];

export function NewsSection() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Últimas Notícias</h2>
        <Link
          href="/noticias"
          className="text-sm text-yellow-400 hover:underline"
        >
          Ver todas
        </Link>
      </div>

      {/* MODIFICADO: Usando um grid para os cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_NEWS.map((item) => (
          <NewsCard
            key={item.title}
            href={item.href}
            imageUrl={item.imageUrl}
            tag={item.tag}
            title={item.title}
            date={item.date}
          />
        ))}
      </div>
    </section>
  );
}