"use client";

import { useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, AlertTriangle } from "lucide-react";
import { getSponsorsData, saveSponsorsData } from "@/lib/sponsors";
import { getScheduleData, saveScheduleData } from "@/lib/schedule";
import { getStats, clearAnalytics } from "@/lib/analytics";

export default function ConfiguracoesPage() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleExportData = () => {
    try {
      const data = {
        sponsors: getSponsorsData(),
        schedule: getScheduleData(),
        analytics: getStats(),
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `radiouai-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMessage({ type: "success", text: "Backup criado com sucesso!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao criar backup." });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);

        if (data.sponsors) {
          saveSponsorsData(data.sponsors);
        }
        if (data.schedule) {
          saveScheduleData(data.schedule);
        }

        setMessage({
          type: "success",
          text: "Dados importados com sucesso! Recarregue a página.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setMessage({ type: "error", text: "Erro ao importar dados." });
        setTimeout(() => setMessage(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleClearAnalytics = () => {
    if (
      confirm(
        "Tem certeza que deseja limpar todas as estatísticas? Esta ação não pode ser desfeita."
      )
    ) {
      clearAnalytics();
      setMessage({ type: "success", text: "Analytics limpo com sucesso!" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <AdminHeader
        title="Configurações"
        subtitle="Backup e gerenciamento de dados"
      />

      <div className="p-8 max-w-4xl">
        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Backup Section */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Backup de Dados
          </h2>
          <p className="text-neutral-400 mb-6 text-sm">
            Os dados ficam salvos no navegador. Faça backup regularmente para não
            perder patrocinadores e programação.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleExportData}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados (Backup)
            </Button>

            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
                id="import-file"
              />
              <label htmlFor="import-file">
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("import-file")?.click()
                  }
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Dados (Restaurar)
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Analytics</h2>
          <p className="text-neutral-400 mb-6 text-sm">
            Limpe as estatísticas se necessário (ex: após testes).
          </p>

          <Button
            onClick={handleClearAnalytics}
            variant="outline"
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Estatísticas
          </Button>
        </div>

        {/* Info Section */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-2">
                Importante sobre os dados
              </h3>
              <ul className="text-yellow-400/80 text-sm space-y-1 list-disc list-inside">
                <li>
                  Dados salvos apenas neste navegador (localStorage)
                </li>
                <li>
                  Se limpar cache ou trocar de navegador, os dados são perdidos
                </li>
                <li>
                  Faça backup semanal clicando em "Exportar Dados"
                </li>
                <li>
                  Para usar em outro computador, importe o arquivo de backup
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
