// app/components/Home/ScheduleSection.tsx
import { BookA } from "lucide-react";
import Link from "next/link";

export function ScheduleSection() {
  return (
    // MODIFICADO: Aplicando padding e fundo para parecer um "widget"
    <section className="w-full p-6 bg-neutral-900 rounded-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Programação</h2>
        <Link
          href="/agenda"
          className="text-sm text-yellow-400 hover:underline"
        >
          Ver completa
        </Link>
      </div>

      {/* MODIFICADO: Lista com visual melhorado */}
      <div className="space-y-4">
        {/* Item 1 */}
        <div className="p-4 bg-neutral-800 rounded-md transition-colors hover:bg-neutral-700">
          <p className="text-sm text-yellow-400">08:00 - 10:00</p>
          <h3 className="font-semibold text-white">Programa da Manhã</h3>
          <p className="text-sm text-neutral-400">Com Locutor X</p>
        </div>
        
        {/* Item 2 */}
        <div className="p-4 bg-neutral-800 rounded-md transition-colors hover:bg-neutral-700">
          <p className="text-sm text-yellow-400">10:00 - 12:00</p>
          <h3 className="font-semibold text-white">Sucessos da Uai</h3>
          <p className="text-sm text-neutral-400">O melhor da música</p>
        </div>
        
        {/* Item 3 */}
        <div className="p-4 bg-neutral-800 rounded-md transition-colors hover:bg-neutral-700">
          <p className="text-sm text-yellow-400">12:00 - 13:00</p>
          <h3 className="font-semibold text-white">Jornal Uai</h3>
          <p className="text-sm text-neutral-400">As notícias do dia</p>
        </div>
      </div>
    </section>
  );
}