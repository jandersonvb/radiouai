"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sponsor,
  getSponsors,
  deleteSponsor,
  updateSponsor,
  reorderSponsors,
} from "@/lib/sponsors";
import Image from "next/image";
import Link from "next/link";
import { SponsorFormModal } from "./components/SponsorFormModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";

export default function PatrocinadoresPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Sponsor | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const loadSponsors = () => {
    setSponsors(getSponsors());
  };

  useEffect(() => {
    loadSponsors();
  }, []);

  const handleToggleActive = (sponsor: Sponsor) => {
    updateSponsor(sponsor.id, { active: !sponsor.active });
    loadSponsors();
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteSponsor(deleteTarget.id);
      setDeleteTarget(null);
      loadSponsors();
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingSponsor(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingSponsor(null);
    loadSponsors();
  };

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const newSponsors = [...sponsors];
    const draggedIndex = newSponsors.findIndex((s) => s.id === draggedId);
    const targetIndex = newSponsors.findIndex((s) => s.id === targetId);

    const [removed] = newSponsors.splice(draggedIndex, 1);
    newSponsors.splice(targetIndex, 0, removed);

    setSponsors(newSponsors);
  };

  const handleDragEnd = () => {
    if (draggedId) {
      reorderSponsors(sponsors.map((s) => s.id));
    }
    setDraggedId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <AdminHeader
        title="Patrocinadores"
        subtitle="Gerencie os parceiros comerciais da rádio"
      />

      <div className="p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-neutral-400">
            {sponsors.length} patrocinador{sponsors.length !== 1 ? "es" : ""}{" "}
            cadastrado{sponsors.length !== 1 ? "s" : ""}
          </p>
          <Button
            onClick={handleCreate}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Patrocinador
          </Button>
        </div>

        {/* Sponsors List */}
        {sponsors.length === 0 ? (
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-neutral-400 mb-4">
              Nenhum patrocinador cadastrado ainda.
            </p>
            <Button
              onClick={handleCreate}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Patrocinador
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                draggable
                onDragStart={() => handleDragStart(sponsor.id)}
                onDragOver={(e) => handleDragOver(e, sponsor.id)}
                onDragEnd={handleDragEnd}
                className={`bg-neutral-900/50 backdrop-blur-sm border rounded-2xl p-4 transition-all duration-200 ${
                  draggedId === sponsor.id
                    ? "border-red-500/50 opacity-50"
                    : "border-white/10 hover:border-white/20"
                } ${!sponsor.active ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-neutral-500 hover:text-white">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Logo */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <Image
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      fill
                      className="object-cover p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold truncate">
                        {sponsor.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          sponsor.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-neutral-500/20 text-neutral-400"
                        }`}
                      >
                        {sponsor.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm">{sponsor.category}</p>
                    <p className="text-neutral-500 text-xs truncate mt-1">
                      {sponsor.address}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/patrocinadores/${sponsor.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Ver página"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleToggleActive(sponsor)}
                      className={`p-2 rounded-lg transition-colors ${
                        sponsor.active
                          ? "text-green-400 hover:bg-green-500/10"
                          : "text-neutral-400 hover:bg-white/10"
                      }`}
                      title={sponsor.active ? "Desativar" : "Ativar"}
                    >
                      {sponsor.active ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(sponsor)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(sponsor)}
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
      </div>

      {/* Modals */}
      <SponsorFormModal
        isOpen={isFormOpen}
        onClose={handleFormClose}
        sponsor={editingSponsor}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        sponsorName={deleteTarget?.name || ""}
      />
    </div>
  );
}
