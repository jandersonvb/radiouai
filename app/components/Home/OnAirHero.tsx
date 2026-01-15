// app/components/Home/OnAirHero.tsx
"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Program, getCurrentProgram, formatTimeRange } from "@/lib/schedule";

export function OnAirHero() {
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);

  useEffect(() => {
    setCurrentProgram(getCurrentProgram());

    // Atualizar a cada minuto
    const interval = setInterval(() => {
      setCurrentProgram(getCurrentProgram());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        {/* Informações "No Ar" */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              No Ar Agora
            </span>
          </div>
          {currentProgram && (
            <>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                {currentProgram.name}
              </h1>
              <p className="text-base text-neutral-400">
                Com {currentProgram.host}
              </p>
              <p className="text-sm text-yellow-400 font-semibold mt-1">
                {formatTimeRange(currentProgram.startTime, currentProgram.endTime)}
              </p>
            </>
          )}
        </div>

        {/* Botão WhatsApp */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Link
            href="https://wa.me/5535988312020"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition text-sm md:text-base flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={20} />
            Entre em Contato via WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}