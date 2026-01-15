"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Program,
  getPrograms,
  deleteProgram,
  updateProgram,
  DAYS_SHORT,
  DayOfWeek,
} from "@/lib/schedule";
import { ProgramFormModal } from "./components/ProgramFormModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";

export default function ProgramacaoPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);

  const loadPrograms = () => {
    setPrograms(getPrograms());
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const handleToggleActive = (program: Program) => {
    updateProgram(program.id, { active: !program.active });
    loadPrograms();
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProgram(deleteTarget.id);
      setDeleteTarget(null);
      loadPrograms();
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingProgram(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProgram(null);
    loadPrograms();
  };

  const formatDays = (days: DayOfWeek[]) => {
    if (days.length === 7) return "Todos os dias";
    if (
      days.length === 5 &&
      days.every((d) => ["seg", "ter", "qua", "qui", "sex"].includes(d))
    ) {
      return "Seg a Sex";
    }
    if (days.length === 2 && days.includes("sab") && days.includes("dom")) {
      return "Fim de semana";
    }
    return days.map((d) => DAYS_SHORT[d]).join(", ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <AdminHeader
        title="Programação"
        subtitle="Gerencie a grade de programas da rádio"
      />

      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-neutral-400">
            {programs.length} programa{programs.length !== 1 ? "s" : ""}{" "}
            cadastrado{programs.length !== 1 ? "s" : ""}
          </p>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Programa
          </Button>
        </div>

        {/* Programs List */}
        {programs.length === 0 ? (
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-neutral-400 mb-4">
              Nenhum programa cadastrado ainda.
            </p>
            <Button
              onClick={handleCreate}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Programa
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {programs.map((program) => (
              <div
                key={program.id}
                className={`bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-200 hover:border-white/20 ${
                  !program.active ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold text-lg">
                        {program.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          program.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-neutral-500/20 text-neutral-400"
                        }`}
                      >
                        {program.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    <p className="text-neutral-400 mb-3">Com {program.host}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-neutral-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {program.startTime} - {program.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDays(program.days)}</span>
                      </div>
                    </div>

                    {program.description && (
                      <p className="text-neutral-500 text-sm mt-3">
                        {program.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(program)}
                      className={`p-2 rounded-lg transition-colors ${
                        program.active
                          ? "text-green-400 hover:bg-green-500/10"
                          : "text-neutral-400 hover:bg-white/10"
                      }`}
                      title={program.active ? "Desativar" : "Ativar"}
                    >
                      {program.active ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(program)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(program)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Weekly Grid Preview */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Visualização da Grade
          </h2>
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-x-auto">
            <div className="grid grid-cols-8 gap-2 min-w-[800px]">
              {/* Header */}
              <div className="text-neutral-500 text-sm font-medium p-2">
                Horário
              </div>
              {(["seg", "ter", "qua", "qui", "sex", "sab", "dom"] as DayOfWeek[]).map(
                (day) => (
                  <div
                    key={day}
                    className="text-neutral-500 text-sm font-medium p-2 text-center"
                  >
                    {DAYS_SHORT[day]}
                  </div>
                )
              )}

              {/* Programs by time slot */}
              {programs
                .filter((p) => p.active)
                .sort((a, b) => {
                  const [aH] = a.startTime.split(":").map(Number);
                  const [bH] = b.startTime.split(":").map(Number);
                  return aH - bH;
                })
                .map((program) => (
                  <>
                    <div
                      key={`${program.id}-time`}
                      className="text-neutral-400 text-sm p-2 whitespace-nowrap"
                    >
                      {program.startTime} - {program.endTime}
                    </div>
                    {(
                      ["seg", "ter", "qua", "qui", "sex", "sab", "dom"] as DayOfWeek[]
                    ).map((day) => (
                      <div
                        key={`${program.id}-${day}`}
                        className={`p-2 rounded-lg text-center text-xs ${
                          program.days.includes(day)
                            ? "bg-red-600/20 text-red-400 border border-red-500/30"
                            : "bg-neutral-800/50 text-neutral-600"
                        }`}
                      >
                        {program.days.includes(day) ? program.name : "-"}
                      </div>
                    ))}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProgramFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        program={editingProgram}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        programName={deleteTarget?.name || ""}
      />
    </div>
  );
}
