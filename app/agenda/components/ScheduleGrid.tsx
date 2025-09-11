// src/components/ScheduleGrid.tsx
"use client";
import { useMemo, useState } from "react";
import { ProgramCard, type Program } from "./ProgramCard";

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Manhã Uai",
    host: "Dona Maria",
    weekday: 1,
    start: "08:00",
    end: "10:00",
  },
  {
    id: "2",
    title: "Rock da Serra",
    host: "Seu João",
    weekday: 5,
    start: "20:00",
    end: "22:00",
  },
  {
    id: "3",
    title: "Sertanejo Raiz",
    host: "Zé da Viola",
    weekday: 6,
    start: "10:00",
    end: "12:00",
  },
];

export function ScheduleGrid() {
  const [day, setDay] = useState<number>(new Date().getDay());
  const filtered = useMemo(
    () => mockPrograms.filter((p) => p.weekday === day),
    [day]
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, idx) => (
          <button
            key={d}
            onClick={() => setDay(idx)}
            className={`rounded px-3 py-1 text-sm border ${
              day === idx
                ? "bg-uai.red border-uai.red text-white"
                : "border-neutral-700"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-neutral-400 text-sm">Sem programas para este dia.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      )}
    </div>
  );
}
