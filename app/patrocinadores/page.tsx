import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SPONSORS } from "@/app/data/sponsors";
import { buildWhatsAppUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Patrocinadores - Radio Uai",
  description: "Conheca todos os patrocinadores da Radio Uai.",
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5535988312020";
const SPONSOR_CTA_TEXT = "Ola! Tenho interesse em patrocinar a Radio Uai.";
const PAGE_SIZE = 6;

type PageSearchParams = {
  page?: string | string[];
};

type PageProps = {
  searchParams?: Promise<PageSearchParams>;
};

function excerpt(text: string, maxLength = 180) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function buildPageHref(page: number): string {
  return page <= 1 ? "/patrocinadores" : `/patrocinadores?page=${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: number[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push(-1);
  }

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (end < totalPages - 1) {
    pages.push(-2);
  }

  pages.push(totalPages);
  return pages;
}

export default async function PatrocinadoresPage({ searchParams }: PageProps) {
  const rawSearchParams = searchParams ? await searchParams : {};
  const sponsorWhatsAppUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, SPONSOR_CTA_TEXT);
  const allSponsors = [...SPONSORS].sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR")
  );
  const totalSponsors = allSponsors.length;
  const totalPages = Math.max(1, Math.ceil(totalSponsors / PAGE_SIZE));
  const currentPage = Math.min(parsePage(rawSearchParams.page), totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalSponsors);
  const paginatedSponsors = allSponsors.slice(startIndex, endIndex);
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 pb-32 space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-r from-white via-[#fff8f8] to-[#ffeef0] p-6 md:p-8 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#d91e28]/15 blur-3xl" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#d91e28]">
                Marcas parceiras
              </p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
                Nossos patrocinadores
              </h1>
              <p className="max-w-2xl text-sm md:text-base text-zinc-600">
                Conheca as empresas que fortalecem a programacao da Radio Uai.
              </p>
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
                {totalSponsors} marca{totalSponsors === 1 ? "" : "s"} parceira
                {totalSponsors === 1 ? "" : "s"}
              </span>
            </div>

            <a
              href={sponsorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#d91e28] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d91e28]/30 transition hover:-translate-y-0.5 hover:bg-[#b0171c]"
            >
              Seja um patrocinador
            </a>
          </div>
        </section>

        {totalSponsors > 0 ? (
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
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
              {paginatedSponsors.map((sponsor) => (
                <article
                  key={sponsor.slug}
                  className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:border-[#d91e28]/40"
                >
                  <Link
                    href={`/patrocinadores/${sponsor.slug}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50"
                    aria-label={`Abrir detalhes de ${sponsor.name}`}
                  >
                    <Image
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      fill
                      className="object-contain p-4 transition duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="mt-4 flex flex-1 flex-col">
                    <span className="inline-flex w-fit rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-zinc-600">
                      {sponsor.category}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-zinc-900">{sponsor.name}</h2>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                      {excerpt(sponsor.description, 170)}
                    </p>

                    <div className="mt-auto pt-4 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/patrocinadores/${sponsor.slug}`}
                        className="inline-flex items-center rounded-md bg-[#d91e28] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#b0171c]"
                      >
                        Conhecer patrocinador
                      </Link>
                      {sponsor.whatsapp && (
                        <a
                          href={`https://wa.me/${sponsor.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-green-300 hover:text-green-600"
                          aria-label={`WhatsApp ${sponsor.name}`}
                        >
                          <FaWhatsapp size={15} />
                        </a>
                      )}
                      {sponsor.instagram && (
                        <a
                          href={sponsor.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-pink-300 hover:text-pink-600"
                          aria-label={`Instagram ${sponsor.name}`}
                        >
                          <FaInstagram size={15} />
                        </a>
                      )}
                      {sponsor.facebook && (
                        <a
                          href={sponsor.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-blue-300 hover:text-blue-600"
                          aria-label={`Facebook ${sponsor.name}`}
                        >
                          <FaFacebookF size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                {hasPreviousPage ? (
                  <Link
                    href={buildPageHref(currentPage - 1)}
                    className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Anterior
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-md border border-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-400">
                    Anterior
                  </span>
                )}

                <div className="flex items-center gap-1.5">
                  {visiblePages.map((page, index) =>
                    page < 0 ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm text-zinc-400"
                      >
                        ...
                      </span>
                    ) : page === currentPage ? (
                      <span
                        key={page}
                        className="inline-flex h-8 min-w-8 items-center justify-center rounded-md bg-[#d91e28] px-2 text-sm font-semibold text-white"
                      >
                        {page}
                      </span>
                    ) : (
                      <Link
                        key={page}
                        href={buildPageHref(page)}
                        className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-zinc-200 px-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                      >
                        {page}
                      </Link>
                    )
                  )}
                </div>

                {hasNextPage ? (
                  <Link
                    href={buildPageHref(currentPage + 1)}
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
            <p className="text-lg text-zinc-600">Nenhum patrocinador cadastrado ainda.</p>
            <a
              href={sponsorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-lg bg-[#d91e28] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b0171c]"
            >
              Seja o primeiro
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
