import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaClock,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import {
  getAllSponsorSlugs,
  getSponsorBySlug,
  SPONSORS,
} from "@/app/data/sponsors";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSponsorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sponsor = getSponsorBySlug(slug);

  if (!sponsor) {
    return { title: "Patrocinador nao encontrado" };
  }

  return {
    title: `${sponsor.name} | Radio Uai`,
    description: sponsor.description,
  };
}

export default async function SponsorPage({ params }: PageProps) {
  const { slug } = await params;
  const sponsor = getSponsorBySlug(slug);

  if (!sponsor) {
    notFound();
  }

  const otherSponsors = SPONSORS.filter((item) => item.slug !== sponsor.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 pb-32 space-y-8">
        <div className="flex justify-end">
          <Link
            href="/patrocinadores"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900"
          >
            <FaArrowLeft size={13} />
            Voltar para patrocinadores
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-r from-white via-[#fff8f8] to-[#ffeef0] p-6 md:p-8 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#d91e28]/15 blur-3xl" />

          <div className="relative grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="relative mx-auto w-full max-w-[220px] aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <Image
                src={sponsor.logoUrl}
                alt={sponsor.name}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] text-[#d91e28]">Patrocinador parceiro</p>
                <span className="inline-flex w-fit rounded-full border border-[#d91e28]/20 bg-[#d91e28]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#d91e28]">
                  {sponsor.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900">{sponsor.name}</h1>
                <p className="max-w-3xl text-sm md:text-lg leading-relaxed text-zinc-600">{sponsor.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {sponsor.whatsapp && (
                  <a
                    href={`https://wa.me/${sponsor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-green-300 hover:text-green-700"
                  >
                    <FaWhatsapp size={16} />
                    WhatsApp
                  </a>
                )}
                <a
                  href={`tel:${sponsor.phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  <FaPhone size={14} />
                  Ligar
                </a>
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#d91e28] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#d91e28]/20 transition hover:bg-[#b0171c]"
                >
                  <FaGlobe size={14} />
                  Visitar site
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <section className="rounded-3xl border border-zinc-200 bg-white p-5 md:p-6 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)]">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-zinc-900">
              <span className="h-6 w-1 rounded-full bg-[#d91e28]" />
              Galeria
            </h2>

            {sponsor.galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {sponsor.galleryImages.map((image, index) => (
                  <div
                    key={`${sponsor.slug}-gallery-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                  >
                    <Image
                      src={image}
                      alt={`${sponsor.name} - Foto ${index + 1}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
                Nenhuma imagem cadastrada para este patrocinador.
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)]">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-zinc-900">
                <span className="h-6 w-1 rounded-full bg-[#d91e28]" />
                Informacoes
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <div className="mt-0.5 rounded-lg bg-[#d91e28]/10 p-2 text-[#d91e28]">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Endereco</p>
                    <p className="text-sm text-zinc-800">{sponsor.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <div className="mt-0.5 rounded-lg bg-[#d91e28]/10 p-2 text-[#d91e28]">
                    <FaPhone size={13} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Telefone</p>
                    <p className="text-sm text-zinc-800">{sponsor.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                  <div className="mt-0.5 rounded-lg bg-[#d91e28]/10 p-2 text-[#d91e28]">
                    <FaClock size={13} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">Horario</p>
                    <p className="text-sm text-zinc-800">{sponsor.hours}</p>
                  </div>
                </div>
              </div>
            </section>

            {(sponsor.instagram || sponsor.facebook) && (
              <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)]">
                <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-zinc-900">
                  <span className="h-6 w-1 rounded-full bg-[#d91e28]" />
                  Redes sociais
                </h2>

                <div className="space-y-2">
                  {sponsor.instagram && (
                    <a
                      href={sponsor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-pink-300 hover:text-pink-700"
                    >
                      <FaInstagram size={16} />
                      Instagram
                    </a>
                  )}
                  {sponsor.facebook && (
                    <a
                      href={sponsor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-blue-300 hover:text-blue-700"
                    >
                      <FaFacebookF size={14} />
                      Facebook
                    </a>
                  )}
                </div>
              </section>
            )}
          </aside>
        </div>

        {otherSponsors.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-zinc-900">Outros patrocinadores</h2>
              <Link
                href="/patrocinadores"
                className="text-sm font-semibold text-[#d91e28] transition hover:text-[#b0171c]"
              >
                Ver todos
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {otherSponsors.map((item) => (
                <article
                  key={item.slug}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:border-[#d91e28]/40"
                >
                  <div className="flex items-start gap-4">
                    <Link
                      href={`/patrocinadores/${item.slug}`}
                      className="shrink-0"
                      aria-label={`Abrir detalhes de ${item.name}`}
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                        <Image
                          src={item.logoUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </Link>
                    <div className="min-w-0 flex-1 space-y-2">
                      <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-zinc-600">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900">{item.name}</h3>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/patrocinadores/${item.slug}`}
                      className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      Ver perfil
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
