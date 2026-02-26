import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Program = {
  id: string;
  title: string;
  host: string;
  weekday: number; // 0..6
  start: string; // "10:00"
  end: string; // "12:00"
  description?: string;
  category?: string;
};

type ProgramCardProps = {
  program: Program;
  isLive?: boolean;
};

export function ProgramCard({ program, isLive = false }: ProgramCardProps) {
  return (
    <Card className={`border-zinc-200 bg-white shadow-sm transition ${isLive ? "border-[#d91e28]/45 ring-2 ring-[#d91e28]/15" : "hover:border-[#d91e28]/35"}`}>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#d91e28]">
            {program.start} - {program.end}
          </span>
          {isLive && (
            <span className="inline-flex items-center rounded-full bg-[#d91e28] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Ao vivo
            </span>
          )}
        </div>
        <CardTitle className="text-base text-zinc-900">{program.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-zinc-600 space-y-2">
        <p>
          <span className="font-semibold text-zinc-800">Com:</span> {program.host}
        </p>
        {program.category && (
          <p className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] uppercase tracking-wide text-zinc-600">
            {program.category}
          </p>
        )}
        {program.description && (
          <p className="text-sm text-zinc-600 leading-relaxed">{program.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
