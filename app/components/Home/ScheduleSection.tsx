// app/components/Home/ScheduleSection.tsx
import { BookA } from "lucide-react";
import Link from "next/link";

export function ScheduleSection() {
  return (
    // MODIFICADO: Aplicando padding e fundo para parecer um "widget"
    // <section className="w-full p-6 bg-neutral-900 rounded-lg h-full">
    //   <div className="flex items-center justify-between mb-4">
    <section className="w-full px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h2 className="text-2xl font-bold text-white">Programação</h2>
        {/* <Link
          href="/agenda"
          className="text-sm text-yellow-400 hover:underline"
        >
          Ver completa
        </Link> */}
      </div>

      {/* MODIFICADO: Lista com visual melhorado */}
      <div className="space-y-4">
        {/* Item 1 */}
        <div className="p-4 bg-neutral-800 rounded-md transition-colors hover:bg-neutral-700">
          <p className="text-sm text-yellow-400">08:00 - 10:00</p>
          <h3 className="font-semibold text-white">Programa</h3>
          <p className="text-sm text-neutral-400">Com Locutor Markinhos Vilas Boas</p>
        </div>


      </div>
    </section>
  );
}