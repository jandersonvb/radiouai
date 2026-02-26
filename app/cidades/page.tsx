"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

type Estado = {
  id: number;
  sigla: string;
  nome: string;
};

type Cidade = {
  id: number;
  nome: string;
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function CidadesPage() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [letraSelecionada, setLetraSelecionada] = useState("A");
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
      .then((r) => r.json())
      .then(setEstados);
  }, []);

  useEffect(() => {
    if (!estadoSelecionado) {
      setCidades([]);
      return;
    }
    setLoading(true);
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios?orderBy=nome`
    )
      .then((r) => r.json())
      .then((data: Cidade[]) => {
        setCidades(data);
        setLetraSelecionada("A");
        setBusca("");
      })
      .finally(() => setLoading(false));
  }, [estadoSelecionado]);

  const cidadesFiltradas = cidades.filter((c) => {
    const matchLetra = c.nome.toUpperCase().startsWith(letraSelecionada);
    const matchBusca = busca
      ? c.nome.toLowerCase().includes(busca.toLowerCase())
      : true;
    return matchLetra && matchBusca;
  });

  const letrasComCidades = new Set(
    cidades.map((c) => c.nome.charAt(0).toUpperCase())
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 pb-32 space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-r from-white via-[#fff8f8] to-[#ffeef0] p-6 md:p-8 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#d91e28]/15 blur-3xl" />
          <div className="relative space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d91e28]">
              Navegacao por estado
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
              Cidades do Brasil
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-zinc-600">
              Selecione o estado e filtre por letra para explorar os municipios.
            </p>
          </div>
        </section>

        {/* Seletor de estado */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-4 md:p-5 shadow-[0_14px_35px_-30px_rgba(0,0,0,0.6)] space-y-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={estadoSelecionado}
              onChange={(e) => setEstadoSelecionado(e.target.value)}
              className="w-full sm:w-72 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-[#d91e28] focus:ring-4 focus:ring-[#d91e28]/10"
            >
              <option value="">Selecione um estado</option>
              {estados.map((e) => (
                <option key={e.id} value={e.sigla}>
                  {e.nome} ({e.sigla})
                </option>
              ))}
            </select>

            {cidades.length > 0 && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Buscar cidade..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-4 py-2.5 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-[#d91e28] focus:ring-4 focus:ring-[#d91e28]/10"
                />
              </div>
            )}
          </div>

          {/* Navegação A-Z */}
          {cidades.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {ALPHABET.map((letra) => {
                const temCidades = letrasComCidades.has(letra);
                return (
                  <button
                    key={letra}
                    onClick={() => temCidades && setLetraSelecionada(letra)}
                    disabled={!temCidades}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-semibold border transition ${
                      letraSelecionada === letra
                        ? "bg-[#d91e28] text-white border-[#d91e28]"
                        : temCidades
                          ? "bg-white border-zinc-200 text-zinc-700 hover:border-[#d91e28]/40 hover:text-[#d91e28] hover:bg-[#fff7f7]"
                          : "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    {letra}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Estado vazio */}
        {!estadoSelecionado && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <MapPin className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg">Selecione um estado para ver as cidades</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#d91e28] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Contagem */}
        {!loading && cidades.length > 0 && (
          <p className="text-zinc-500 text-xs">
            {cidadesFiltradas.length} cidade{cidadesFiltradas.length !== 1 && "s"}{" "}
            com a letra &quot;{letraSelecionada}&quot;
            {busca && ` contendo "${busca}"`}
            {" • clique em uma cidade para ver os patrocinadores"}
          </p>
        )}

        {/* Lista de cidades */}
        {!loading && cidadesFiltradas.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {cidadesFiltradas.map((c) => (
              <Link
                key={c.id}
                href={`/cidades/${estadoSelecionado.toLowerCase()}/${encodeURIComponent(c.nome)}`}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-left text-sm text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#d91e28]/45 hover:text-zinc-900"
              >
                {c.nome}
              </Link>
            ))}
          </div>
        )}

        {/* Sem resultados */}
        {!loading && estadoSelecionado && cidadesFiltradas.length === 0 && cidades.length > 0 && (
          <p className="text-zinc-500 text-center py-12">
            Nenhuma cidade encontrada com a letra &quot;{letraSelecionada}&quot;
            {busca && ` contendo "${busca}"`}
          </p>
        )}
      </div>
    </div>
  );
}
