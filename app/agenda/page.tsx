// src/app/agenda/page.tsx

import { ScheduleGrid } from "./components/ScheduleGrid";

export default function AgendaPage() {
  return (
    <div className="container py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Agenda de Programas</h1>
      <ScheduleGrid />
    </div>
  );
}
