import Link from "next/link";
import type { Metadata } from "next";
import { FaArrowLeft, FaGlobe, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";
import { getSponsorsByCity } from "@/app/data/sponsors";
import { buildWhatsAppUrl } from "@/lib/contact";

const PAGE_SIZE = 12;
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5535988312020";

type PageSearchParams = {
  page?: string | string[];
};

type PageProps = {
  params: Promise<{ uf: string; cidade: string }>;
  searchParams?: Promise<PageSearchParams>;
};

function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function formatCityLabel(value: string): string {
  return decodeParam(value).replaceAll("+", " ").trim();
}

function formatUfLabel(value: string): string {
  return decodeParam(value).replaceAll("+", " ").toUpperCase().trim();
}

function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function buildCityPageHref(city: string, uf: string, page: number): string {
  return `/cidades/${uf.toLowerCase()}/${encodeURIComponent(city)}?page=${page}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uf, cidade } = await params;
  const cidadeLabel = formatCityLabel(cidade);
  const ufLabel = formatUfLabel(uf);

  return {
    title: `Patrocinadores em ${cidadeLabel} (${ufLabel}) | Radio Uai`,
    description: `Lista de patrocinadores em ${cidadeLabel} (${ufLabel}).`,
  };
}

export default async function SponsorsByCityPage({ params, searchParams }: PageProps) {
  const { uf, cidade } = await params;
  const cidadeLabel = formatCityLabel(cidade);
  const ufLabel = formatUfLabel(uf);
  const rawSearchParams = searchParams ? await searchParams : {};
  const allSponsors = getSponsorsByCity(cidadeLabel, ufLabel).sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR")
  );
  const totalSponsors = allSponsors.length;
  const totalPages = Math.max(1, Math.ceil(totalSponsors / PAGE_SIZE));
  const currentPage = Math.min(parsePage(rawSearchParams.page), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalSponsors);
  const sponsors = allSponsors.slice(startIndex, endIndex);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const sponsorCtaText = `Ola! Quero ser patrocinador da Radio Uai em ${cidadeLabel} (${ufLabel}).`;
  const sponsorWhatsAppUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, sponsorCtaText);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 pb-32 space-y-8">
        <div className="flex justify-end">
          <Link
            href="/cidades"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900"
          >
            <FaArrowLeft size={13} />
            Voltar para cidades
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-r from-white via-[#fff8f8] to-[#ffeef0] p-6 md:p-8 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#d91e28]/15 blur-3xl" />
          <div className="relative space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d91e28]">
              Patrocinadores por cidade
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
              {cidadeLabel} ({ufLabel})
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-zinc-600">
              {totalSponsors} patrocinador{totalSponsors === 1 ? "" : "es"} encontrado
              {totalSponsors === 1 ? "" : "s"} nesta cidade.
            </p>
          </div>
        </section>

        {totalSponsors > 0 ? (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
              <p className="text-sm text-zinc-600">
                Mostrando <span className="font-semibold text-zinc-900">{startIndex + 1}</span>-
                <span className="font-semibold text-zinc-900">{endIndex}</span> de{" "}
                <span className="font-semibold text-zinc-900">{totalSponsors}</span>
              </p>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Pagina {currentPage} de {totalPages}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sponsors.map((sponsor) => (
                <article
                  key={sponsor.slug}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:border-[#d91e28]/40"
                >
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-zinc-600">
                      {sponsor.category}
                    </span>
                    <h2 className="text-lg font-bold text-zinc-900">{sponsor.name}</h2>
                    <p className="text-sm text-zinc-600">{sponsor.description}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-zinc-600">
                      <FaMapMarkerAlt className="mt-0.5 text-[#d91e28]" size={13} />
                      <span>{sponsor.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <FaPhone className="text-[#d91e28]" size={12} />
                      <span>{sponsor.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Link
                      href={`/patrocinadores/${sponsor.slug}`}
                      className="inline-flex items-center rounded-md bg-[#d91e28] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b0171c]"
                    >
                      Ver perfil
                    </Link>
                    <a
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      <FaGlobe size={11} />
                      Site
                    </a>
                    {sponsor.whatsapp && (
                      <a
                        href={`https://wa.me/${sponsor.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:border-green-300 hover:text-green-700"
                      >
                        <FaWhatsapp size={12} />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                {currentPage > 1 ? (
                  <Link
                    href={buildCityPageHref(cidadeLabel, ufLabel, previousPage)}
                    className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Anterior
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-md border border-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-400">
                    Anterior
                  </span>
                )}

                <span className="text-sm text-zinc-600">
                  Pagina {currentPage} de {totalPages}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={buildCityPageHref(cidadeLabel, ufLabel, nextPage)}
                    className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Proxima
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-md border border-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-400">
                    Proxima
                  </span>
                )}
              </div>
            )}
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center">
            <p className="text-lg text-zinc-600">
              Nenhum patrocinador cadastrado em {cidadeLabel} ({ufLabel}) no momento.
            </p>
            <a
              href={sponsorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#d91e28] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b0171c]"
            >
              <FaWhatsapp size={14} />
              Seja um patrocinador
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
