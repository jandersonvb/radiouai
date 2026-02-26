import { ScheduleGrid } from "./components/ScheduleGrid";

export default function AgendaPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 pb-32 space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-r from-white via-[#fff8f8] to-[#ffeef0] p-6 md:p-8 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#d91e28]/15 blur-3xl" />
          <div className="relative space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d91e28]">
              Agenda oficial
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
              Programacao da Radio Uai
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-zinc-600">
              Veja os horarios dos programas, descubra o que esta no ar e acompanhe
              a grade semanal da emissora.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
              Ao vivo todos os dias
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Programas musicais, informativos e participacao dos ouvintes ao longo
              da semana.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
              Interacao
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Fale com a equipe pelo WhatsApp e participe com pedidos musicais e
              recados no ar.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
              Aviso
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              A grade pode sofrer ajustes especiais em datas comemorativas e coberturas.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-5 md:p-6 shadow-[0_14px_35px_-26px_rgba(0,0,0,0.5)]">
          <ScheduleGrid />
        </section>
      </div>
    </div>
  );
}
