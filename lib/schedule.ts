// lib/schedule.ts

export type DayOfWeek = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export type Program = {
  id: string;
  name: string;
  host: string;
  description?: string;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  days: DayOfWeek[];
  active: boolean;
  order: number;
};

export type ScheduleData = {
  programs: Program[];
};

// Storage key para localStorage
const SCHEDULE_STORAGE_KEY = "radiouai_schedule";

// Dias da semana
export const DAYS_MAP: Record<DayOfWeek, string> = {
  seg: "Segunda",
  ter: "Terça",
  qua: "Quarta",
  qui: "Quinta",
  sex: "Sexta",
  sab: "Sábado",
  dom: "Domingo",
};

export const DAYS_SHORT: Record<DayOfWeek, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
  dom: "Dom",
};

export const ALL_DAYS: DayOfWeek[] = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];

// Dados iniciais (fallback)
const initialSchedule: ScheduleData = {
  programs: [
    {
      id: "1",
      name: "Programa",
      host: "Locutor Markinhos Vilas Boas",
      description: "Programa matinal com as melhores músicas",
      startTime: "08:00",
      endTime: "10:00",
      days: ["seg", "ter", "qua", "qui", "sex"],
      active: true,
      order: 0,
    },
  ],
};

// Funções de gerenciamento

export function getScheduleData(): ScheduleData {
  if (typeof window === "undefined") {
    return initialSchedule;
  }

  const stored = localStorage.getItem(SCHEDULE_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialSchedule;
    }
  }
  return initialSchedule;
}

export function saveScheduleData(data: ScheduleData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(data));
}

export function getPrograms(): Program[] {
  const data = getScheduleData();
  return data.programs.sort((a, b) => a.order - b.order);
}

export function getActivePrograms(): Program[] {
  return getPrograms().filter((p) => p.active);
}

export function getProgramById(id: string): Program | undefined {
  return getPrograms().find((p) => p.id === id);
}

export function createProgram(program: Omit<Program, "id">): Program {
  const data = getScheduleData();
  const newId = String(Date.now());
  const newProgram: Program = {
    ...program,
    id: newId,
  };
  data.programs.push(newProgram);
  saveScheduleData(data);
  return newProgram;
}

export function updateProgram(id: string, updates: Partial<Program>): Program | null {
  const data = getScheduleData();
  const index = data.programs.findIndex((p) => p.id === id);
  if (index === -1) return null;

  data.programs[index] = { ...data.programs[index], ...updates };
  saveScheduleData(data);
  return data.programs[index];
}

export function deleteProgram(id: string): boolean {
  const data = getScheduleData();
  const index = data.programs.findIndex((p) => p.id === id);
  if (index === -1) return false;

  data.programs.splice(index, 1);
  saveScheduleData(data);
  return true;
}

// Utilidades de tempo

export function getCurrentDayOfWeek(): DayOfWeek {
  const days: DayOfWeek[] = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
  return days[new Date().getDay()];
}

export function getCurrentTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

export function isTimeInRange(
  time: string,
  startTime: string,
  endTime: string
): boolean {
  const [timeH, timeM] = time.split(":").map(Number);
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const timeMinutes = timeH * 60 + timeM;
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  return timeMinutes >= startMinutes && timeMinutes < endMinutes;
}

export function getCurrentProgram(): Program | null {
  const programs = getActivePrograms();
  const currentDay = getCurrentDayOfWeek();
  const currentTime = getCurrentTime();

  for (const program of programs) {
    if (
      program.days.includes(currentDay) &&
      isTimeInRange(currentTime, program.startTime, program.endTime)
    ) {
      return program;
    }
  }

  return null;
}

export function getProgramsForDay(day: DayOfWeek): Program[] {
  return getActivePrograms()
    .filter((p) => p.days.includes(day))
    .sort((a, b) => {
      const [aH, aM] = a.startTime.split(":").map(Number);
      const [bH, bM] = b.startTime.split(":").map(Number);
      return aH * 60 + aM - (bH * 60 + bM);
    });
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}
