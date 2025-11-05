// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { NewsSection } from "./components/Home/NewsSection";
import { ScheduleSection } from "./components/Home/ScheduleSection";
import { OnAirHero } from "./components/Home/OnAirHero";
import { SponsorsSection } from "./components/Home/SponsorsSection";
import { YoutubeVideosSection } from "./components/Home/YoutubeVideosSection";

export default function HomePage() {
  return (

    <div className="min-h-screen">
      <div className="container mx-auto py-12 space-y-12 pb-32">

        {/* Hero 100% largura */}
        <OnAirHero />

        {/* MODIFICADO: Grid principal (Main + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Coluna Principal (Notícias) */}
          <div className="lg:col-span-2">
            <YoutubeVideosSection />
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
