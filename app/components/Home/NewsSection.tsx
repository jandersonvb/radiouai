import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/contact";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5535988312020";
const SPONSOR_CTA_TEXT = "Ola! Quero anunciar na Radio Uai.";
const SPONSOR_CTA_URL = buildWhatsAppUrl(WHATSAPP_NUMBER, SPONSOR_CTA_TEXT);

type Highlight = {
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
  featured?: boolean;
};

const HIGHLIGHTS: Highlight[] = [
  {
    tag: "Programacao",
    title: "Confira a grade da Radio Uai",
    description:
      "Veja os horarios dos programas e acompanhe o que toca durante a semana.",
    href: "/agenda",
    cta: "Ver programacao",
  },
  {
    tag: "Mapa de cidades",
    title: "Encontre patrocinadores por cidade",
    description:
      "Navegue por estado e cidade para descobrir os parceiros da sua regiao.",
    href: "/cidades",
    cta: "Explorar cidades",
  },
  {
    tag: "Parceiros",
    title: "Conheca nossos patrocinadores",
    description:
      "Apoie quem fortalece a programacao da Radio Uai e conheca seus servicos.",
    href: "/patrocinadores",
    cta: "Ver patrocinadores",
  },
  {
    tag: "Comercial",
    title: "Seja um patrocinador da Radio Uai",
    description:
      "Sua marca em destaque para nossa audiencia com planos flexiveis de divulgacao.",
    href: SPONSOR_CTA_URL,
    cta: "Falar no WhatsApp",
    external: true,
    featured: true,
  },
];

export function NewsSection() {
  return (
    <section className="w-full rounded-3xl border border-zinc-200 bg-white p-5 md:p-6 shadow-[0_14px_35px_-26px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
          Destaques da Radio
        </h2>
        <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
          Atualizado pela equipe
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HIGHLIGHTS.map((item) => (
          <article
            key={item.title}
            className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 ${
              item.featured
                ? "border-[#d91e28]/30 bg-gradient-to-r from-white to-[#fff3f4] shadow-[0_12px_35px_-28px_rgba(217,30,40,0.55)]"
                : "border-zinc-200 bg-white shadow-[0_12px_35px_-28px_rgba(0,0,0,0.45)]"
            }`}
          >
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                item.featured
                  ? "bg-[#d91e28]/10 text-[#d91e28]"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {item.tag}
            </span>
            <h3 className="mt-3 text-xl font-bold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              {item.description}
            </p>

            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  item.featured
                    ? "bg-[#d91e28] text-white shadow-md shadow-[#d91e28]/20 hover:bg-[#b0171c]"
                    : "border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {item.cta}
              </a>
            ) : (
              <Link
                href={item.href}
                className={`mt-4 inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  item.featured
                    ? "bg-[#d91e28] text-white shadow-md shadow-[#d91e28]/20 hover:bg-[#b0171c]"
                    : "border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {item.cta}
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
