import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const PROGRAMA_ATUAL = {
  nome: "Manhã Uai",
  apresentador: "Com Markinhos Vilas Boas",
  horario: "08:00 - 10:00",
};

export function OnAirHero() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#d91e28]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d91e28]/20 bg-[#d91e28]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#d91e28]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d91e28]/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d91e28]" />
              </span>
              No ar agora
            </span>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
              {PROGRAMA_ATUAL.nome}
            </h1>
            <p className="text-base md:text-lg text-zinc-700">
              {PROGRAMA_ATUAL.apresentador}
            </p>
            <p className="text-sm font-semibold text-zinc-500">
              Hoje, {PROGRAMA_ATUAL.horario}
            </p>
          </div>

          <Link
            href="https://wa.me/5535988312020"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22c55e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:-translate-y-0.5 hover:bg-[#16a34a]"
          >
            <FaWhatsapp size={18} />
            Falar no WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
