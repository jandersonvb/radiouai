import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Program = {
  id: string;
  title: string;
  host: string;
  weekday: number; // 0..6
  start: string; // "10:00"
  end: string; // "12:00"
  description?: string;
};

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-base">{program.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-neutral-300">
        <p>Com {program.host}</p>
        <p>
          {program.start} — {program.end}
        </p>
        {program.description && <p className="mt-2">{program.description}</p>}
      </CardContent>
    </Card>
  );
}
