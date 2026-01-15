// app/components/Home/ScheduleSection.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Program,
  getProgramsForDay,
  getCurrentDayOfWeek,
  getCurrentProgram,
  formatTimeRange,
  DAYS_SHORT,
  DayOfWeek,
  ALL_DAYS,
} from "@/lib/schedule";

export function ScheduleSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getCurrentDayOfWeek());
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);

  useEffect(() => {
    setPrograms(getProgramsForDay(selectedDay));
    setCurrentProgram(getCurrentProgram());

    // Atualizar programa atual a cada minuto
    const interval = setInterval(() => {
      setCurrentProgram(getCurrentProgram());
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedDay]);

  return (
    <section className="w-full px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h2 className="text-2xl font-bold text-white">Programação</h2>
      </div>

      {/* Day Selector */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
        {ALL_DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedDay === day
                ? "bg-red-600 text-white"
                : day === getCurrentDayOfWeek()
                ? "bg-neutral-700 text-white"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
            }`}
          >
            {DAYS_SHORT[day]}
          </button>
        ))}
      </div>

      {/* Programs List */}
      <div className="space-y-3">
        {programs.length === 0 ? (
          <div className="p-4 bg-neutral-800/50 rounded-lg text-center">
            <p className="text-neutral-500 text-sm">
              Sem programação para este dia
            </p>
          </div>
        ) : (
          programs.map((program) => {
            const isNow =
              currentProgram?.id === program.id &&
              selectedDay === getCurrentDayOfWeek();

            return (
              <div
                key={program.id}
                className={`p-4 rounded-lg transition-colors ${
                  isNow
                    ? "bg-red-600/20 border border-red-500/30"
                    : "bg-neutral-800 hover:bg-neutral-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <p
                    className={`text-sm font-medium ${
                      isNow ? "text-red-400" : "text-yellow-400"
                    }`}
                  >
                    {formatTimeRange(program.startTime, program.endTime)}
                  </p>
                  {isNow && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/20 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-red-400 text-xs font-medium">
                        AO VIVO
                      </span>
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-white">{program.name}</h3>
                <p className="text-sm text-neutral-400">Com {program.host}</p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}