// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { NewsSection } from "./components/Home/NewsSection";
import { ScheduleSection } from "./components/Home/ScheduleSection";
import { OnAirHero } from "./components/Home/OnAirHero";
import { SponsorsSection } from "./components/Home/SponsorsSection";

export default function HomePage() {
  return (
    // <div className="container py-28 flex flex-col items-center justify-center">
    //   {/* Herói */}
    //   <section className="flex flex-col items-center gap-4 py-14 text-center">
    //     <Image
    //       src="/logo_uai.jpg"
    //       alt="Rádio Uai Logo"
    //       className="rounded-4xl object-cover"
    //       width={200}
    //       height={200}
    //       priority
    //     />
    //     <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
    //       Bem-vindo á <span className="text-uai.red">Rádio Uai</span>!
    //     </h1>
    //     <p className="max-w-xs md:max-w-2xl text-neutral-500 mx-auto">
    //       Mais que uma rádio!
    //     </p>
    //     <div className="flex flex-col md:flex-row gap-3">
    //       <Link
    //         href="https://wa.me/5535988312020"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="px-4 py-2 text-dark rounded-md hover:bg-green-400 transition text-sm md:text-base"
    //       >
    //         <FaWhatsapp className="inline mr-2" />
    //         Entre em contato pelo WhatsApp
    //       </Link>
    //     </div>
    //   </section>

    //   <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //     <NewsSection />
    //     <ScheduleSection />
    //   </section>
    // </div>

    <div className="min-h-screen">
      <div className="container mx-auto py-12 space-y-12 pb-32">

        {/* Hero 100% largura */}
        <OnAirHero />

        {/* MODIFICADO: Grid principal (Main + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Coluna Principal (Notícias) */}
          <div className="lg:col-span-2">
            <NewsSection />
          </div>

          {/* Coluna Lateral (Agenda) */}
          <div className="lg:col-span-1">
            <ScheduleSection />
          </div>

        </div>
        {/* Fim da modificação */}
        <SponsorsSection />
        {/* TODO: Adicionar seção de patrocinadores aqui (largura total) */}
      </div>
    </div>
  );
}
