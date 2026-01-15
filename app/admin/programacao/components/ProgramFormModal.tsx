"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Program,
  createProgram,
  updateProgram,
  getPrograms,
  DayOfWeek,
  ALL_DAYS,
  DAYS_MAP,
} from "@/lib/schedule";

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
}

type FormData = {
  name: string;
  host: string;
  description: string;
  startTime: string;
  endTime: string;
  days: DayOfWeek[];
};

const initialFormData: FormData = {
  name: "",
  host: "",
  description: "",
  startTime: "08:00",
  endTime: "10:00",
  days: ["seg", "ter", "qua", "qui", "sex"],
};

export function ProgramFormModal({
  isOpen,
  onClose,
  program,
}: ProgramFormModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (program) {
      setFormData({
        name: program.name,
        host: program.host,
        description: program.description || "",
        startTime: program.startTime,
        endTime: program.endTime,
        days: program.days,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [program, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayToggle = (day: DayOfWeek) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const selectAllDays = () => {
    setFormData((prev) => ({ ...prev, days: [...ALL_DAYS] }));
  };

  const selectWeekdays = () => {
    setFormData((prev) => ({
      ...prev,
      days: ["seg", "ter", "qua", "qui", "sex"],
    }));
  };

  const selectWeekend = () => {
    setFormData((prev) => ({ ...prev, days: ["sab", "dom"] }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    if (!formData.host.trim()) {
      newErrors.host = "Apresentador é obrigatório";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Horário de início é obrigatório";
    }
    if (!formData.endTime) {
      newErrors.endTime = "Horário de término é obrigatório";
    }
    if (formData.days.length === 0) {
      newErrors.days = "Selecione pelo menos um dia";
    }

    // Validar se horário de término é maior que início
    if (formData.startTime && formData.endTime) {
      const [startH, startM] = formData.startTime.split(":").map(Number);
      const [endH, endM] = formData.endTime.split(":").map(Number);
      if (startH * 60 + startM >= endH * 60 + endM) {
        newErrors.endTime = "Horário de término deve ser após o início";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const programData = {
      name: formData.name,
      host: formData.host,
      description: formData.description || undefined,
      startTime: formData.startTime,
      endTime: formData.endTime,
      days: formData.days,
      active: true,
      order: program?.order ?? getPrograms().length,
    };

    if (program) {
      updateProgram(program.id, programData);
    } else {
      createProgram(programData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            {program ? "Editar Programa" : "Novo Programa"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-300">
                Nome do Programa *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-neutral-800 border-neutral-700 text-white"
                placeholder="Ex: Manhã UAI"
              />
              {errors.name && (
                <p className="text-red-400 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Apresentador */}
            <div className="space-y-2">
              <Label htmlFor="host" className="text-neutral-300">
                Apresentador *
              </Label>
              <Input
                id="host"
                name="host"
                value={formData.host}
                onChange={handleChange}
                className="bg-neutral-800 border-neutral-700 text-white"
                placeholder="Nome do locutor"
              />
              {errors.host && (
                <p className="text-red-400 text-xs">{errors.host}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-neutral-300">
                Descrição (opcional)
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="bg-neutral-800 border-neutral-700 text-white resize-none"
                placeholder="Breve descrição do programa..."
              />
            </div>

            {/* Horários */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-neutral-300">
                  Início *
                </Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
                {errors.startTime && (
                  <p className="text-red-400 text-xs">{errors.startTime}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-neutral-300">
                  Término *
                </Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
                {errors.endTime && (
                  <p className="text-red-400 text-xs">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Dias da Semana */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-neutral-300">Dias da Semana *</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={selectAllDays}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Todos
                  </button>
                  <span className="text-neutral-600">|</span>
                  <button
                    type="button"
                    onClick={selectWeekdays}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Seg-Sex
                  </button>
                  <span className="text-neutral-600">|</span>
                  <button
                    type="button"
                    onClick={selectWeekend}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Fim de semana
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {ALL_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.days.includes(day)
                        ? "bg-red-600/20 text-red-400 border border-red-500/30"
                        : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:border-neutral-600"
                    }`}
                  >
                    {DAYS_MAP[day]}
                  </button>
                ))}
              </div>
              {errors.days && (
                <p className="text-red-400 text-xs">{errors.days}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
            >
              {program ? "Salvar Alterações" : "Criar Programa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
