// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { ScheduleSection } from "./components/Home/ScheduleSection";
import { OnAirHero } from "./components/Home/OnAirHero";
import { SponsorsSection } from "./components/Home/SponsorsSection";
import { YoutubeVideosSection } from "./components/Home/YoutubeVideosSection";
import { trackPageView } from "@/lib/analytics";

export default function HomePage() {
  useEffect(() => {
    trackPageView("/");
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 space-y-12 pb-32">
        {/* Hero 100% largura */}
        <OnAirHero />

        {/* Grid principal (Main + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal (Vídeos) */}
          <div className="lg:col-span-2">
            <YoutubeVideosSection />
          </div>

          {/* Coluna Lateral (Programação) */}
          <div className="lg:col-span-1">
            <ScheduleSection />
          </div>
        </div>

        {/* Seção de Patrocinadores */}
        <SponsorsSection />
      </div>
    </div>
  );
}
