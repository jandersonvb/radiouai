"use client";
import { useMemo, useState } from "react";
import { ProgramCard, type Program } from "./ProgramCard";

const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const WEEK_DAYS_FULL = [
  "Domingo",
  "Segunda-feira",
  "Terca-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

const PROGRAMS: Program[] = [
  {
    id: "seg-06",
    title: "Despertar Uai",
    host: "Equipe Uai",
    weekday: 1,
    start: "06:00",
    end: "08:00",
    category: "Musical",
    description: "Selecao musical para comecar o dia com energia.",
  },
  {
    id: "seg-08",
    title: "Programa Manha Uai",
    host: "Markinhos Vilas Boas",
    weekday: 1,
    start: "08:00",
    end: "10:00",
    category: "Ao vivo",
    description: "Noticias locais, participacao dos ouvintes e entrevistas.",
  },
  {
    id: "seg-10",
    title: "Classicos da Uai",
    host: "Selecao da emissora",
    weekday: 1,
    start: "10:00",
    end: "12:00",
    category: "Classicos",
  },
  {
    id: "seg-14",
    title: "Tarde Mix",
    host: "DJ Uai",
    weekday: 1,
    start: "14:00",
    end: "17:00",
    category: "Hits",
  },
  {
    id: "seg-20",
    title: "Noite Sertaneja",
    host: "Rafa Uai",
    weekday: 1,
    start: "20:00",
    end: "22:00",
    category: "Sertanejo",
  },
  {
    id: "ter-06",
    title: "Despertar Uai",
    host: "Equipe Uai",
    weekday: 2,
    start: "06:00",
    end: "08:00",
    category: "Musical",
  },
  {
    id: "ter-08",
    title: "Programa Manha Uai",
    host: "Markinhos Vilas Boas",
    weekday: 2,
    start: "08:00",
    end: "10:00",
    category: "Ao vivo",
  },
  {
    id: "ter-12",
    title: "Jornal da Uai",
    host: "Redacao Uai",
    weekday: 2,
    start: "12:00",
    end: "13:00",
    category: "Noticias",
  },
  {
    id: "ter-17",
    title: "Arena Uai",
    host: "Equipe de Esportes",
    weekday: 2,
    start: "17:00",
    end: "19:00",
    category: "Esportes",
  },
  {
    id: "ter-22",
    title: "Madrugada Uai",
    host: "Automacao",
    weekday: 2,
    start: "22:00",
    end: "23:59",
    category: "Sequencia musical",
  },
  {
    id: "qua-06",
    title: "Despertar Uai",
    host: "Equipe Uai",
    weekday: 3,
    start: "06:00",
    end: "08:00",
    category: "Musical",
  },
  {
    id: "qua-10",
    title: "Classicos da Uai",
    host: "Selecao da emissora",
    weekday: 3,
    start: "10:00",
    end: "12:00",
    category: "Classicos",
  },
  {
    id: "qua-14",
    title: "Tarde Mix",
    host: "DJ Uai",
    weekday: 3,
    start: "14:00",
    end: "17:00",
    category: "Hits",
  },
  {
    id: "qua-19",
    title: "Conexao Uai",
    host: "Convidados da semana",
    weekday: 3,
    start: "19:00",
    end: "20:00",
    category: "Entrevistas",
  },
  {
    id: "qui-06",
    title: "Despertar Uai",
    host: "Equipe Uai",
    weekday: 4,
    start: "06:00",
    end: "08:00",
    category: "Musical",
  },
  {
    id: "qui-08",
    title: "Programa Manha Uai",
    host: "Markinhos Vilas Boas",
    weekday: 4,
    start: "08:00",
    end: "10:00",
    category: "Ao vivo",
  },
  {
    id: "qui-12",
    title: "Jornal da Uai",
    host: "Redacao Uai",
    weekday: 4,
    start: "12:00",
    end: "13:00",
    category: "Noticias",
  },
  {
    id: "qui-20",
    title: "Especial Flashback",
    host: "Equipe Uai",
    weekday: 4,
    start: "20:00",
    end: "22:00",
    category: "Flashback",
  },
  {
    id: "sex-06",
    title: "Despertar Uai",
    host: "Equipe Uai",
    weekday: 5,
    start: "06:00",
    end: "08:00",
    category: "Musical",
  },
  {
    id: "sex-08",
    title: "Programa Manha Uai",
    host: "Markinhos Vilas Boas",
    weekday: 5,
    start: "08:00",
    end: "10:00",
    category: "Ao vivo",
  },
  {
    id: "sex-17",
    title: "Esquenta do Fim de Semana",
    host: "DJ Uai",
    weekday: 5,
    start: "17:00",
    end: "20:00",
    category: "Especial",
  },
  {
    id: "sex-20",
    title: "Sextou na Uai",
    host: "Equipe Uai",
    weekday: 5,
    start: "20:00",
    end: "23:00",
    category: "Ao vivo",
  },
  {
    id: "sab-08",
    title: "Sabadao Uai",
    host: "Locucao especial",
    weekday: 6,
    start: "08:00",
    end: "12:00",
    category: "Fim de semana",
  },
  {
    id: "sab-14",
    title: "Top Brasil",
    host: "Equipe Uai",
    weekday: 6,
    start: "14:00",
    end: "16:00",
    category: "Top 10",
  },
  {
    id: "sab-18",
    title: "Noite Flashback",
    host: "DJ Uai",
    weekday: 6,
    start: "18:00",
    end: "21:00",
    category: "Flashback",
  },
  {
    id: "dom-09",
    title: "Domingo Sertanejo",
    host: "Equipe Uai",
    weekday: 0,
    start: "09:00",
    end: "12:00",
    category: "Sertanejo",
  },
  {
    id: "dom-14",
    title: "Especial do Ouvinte",
    host: "Pedidos via WhatsApp",
    weekday: 0,
    start: "14:00",
    end: "16:00",
    category: "Interacao",
  },
  {
    id: "dom-18",
    title: "Acustico Uai",
    host: "Selecao da emissora",
    weekday: 0,
    start: "18:00",
    end: "20:00",
    category: "Acustico",
  },
];

function toMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function ScheduleGrid() {
  const [day, setDay] = useState<number>(new Date().getDay());

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const liveProgramId = useMemo(() => {
    const liveProgram = PROGRAMS.find((program) => {
      if (program.weekday !== currentDay) return false;
      const start = toMinutes(program.start);
      const end = toMinutes(program.end);
      return currentMinutes >= start && currentMinutes < end;
    });
    return liveProgram?.id ?? null;
  }, [currentDay, currentMinutes]);

  const filtered = useMemo(
    () =>
      PROGRAMS.filter((program) => program.weekday === day).sort(
        (a, b) => toMinutes(a.start) - toMinutes(b.start)
      ),
    [day]
  );

  const liveProgram = PROGRAMS.find((program) => program.id === liveProgramId);

  return (
    <div className="space-y-5">
      {liveProgram && (
        <div className="rounded-2xl border border-[#d91e28]/30 bg-[#fff5f6] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
            No ar agora
          </p>
          <h3 className="mt-1 text-lg font-bold text-zinc-900">{liveProgram.title}</h3>
          <p className="text-sm text-zinc-600">
            {liveProgram.start} - {liveProgram.end} com {liveProgram.host}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {WEEK_DAYS.map((dayLabel, idx) => (
          <button
            key={dayLabel}
            onClick={() => setDay(idx)}
            className={`rounded-lg px-3 py-1.5 text-sm border transition ${
              day === idx
                ? "bg-[#d91e28] border-[#d91e28] text-white"
                : "border-zinc-200 text-zinc-700 bg-white hover:border-[#d91e28]/35 hover:text-[#d91e28]"
            }`}
          >
            {dayLabel}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3">
        <h3 className="text-lg font-bold text-zinc-900">{WEEK_DAYS_FULL[day]}</h3>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {filtered.length} programa{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="text-sm text-zinc-500">Sem programas cadastrados para este dia.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              isLive={program.id === liveProgramId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
