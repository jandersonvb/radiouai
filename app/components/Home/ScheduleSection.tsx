// app/components/Home/ScheduleSection.tsx
export function ScheduleSection() {
  return (
    <section className="w-full rounded-3xl border border-zinc-200 bg-white p-5 md:p-6 shadow-[0_14px_35px_-26px_rgba(0,0,0,0.5)]">
      <div className="mb-5">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900">
          Programacao
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Grade ao vivo da Radio Uai
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-[#d91e28]/35 hover:bg-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
            08:00 - 10:00
          </p>
          <h3 className="mt-1 font-bold text-zinc-900">Programa Manha Uai</h3>
          <p className="mt-1 text-sm text-zinc-600">Com Markinhos Vilas Boas</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-[#d91e28]/35 hover:bg-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
            10:00 - 12:00
          </p>
          <h3 className="mt-1 font-bold text-zinc-900">Classicos da Uai</h3>
          <p className="mt-1 text-sm text-zinc-600">Selecao musical da emissora</p>
        </div>
      </div>
    </section>
  );
}
