// app/patrocinadores/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaArrowLeft,
} from "react-icons/fa";
import { getSponsorBySlug, getAllSponsorSlugs } from "@/app/data/sponsors";

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
    return { title: "Patrocinador não encontrado" };
  }

  return {
    title: `${sponsor.name} | Rádio Uai`,
    description: sponsor.description,
  };
}

export default async function SponsorPage({ params }: PageProps) {
  const { slug } = await params;
  const sponsor = getSponsorBySlug(slug);

  if (!sponsor) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-900 to-neutral-800 -z-10" />

      <div className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-400 transition-colors mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para a Home</span>
        </Link>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900/80 to-neutral-800/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 mb-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Logo */}
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl group">
              <Image
                src={sponsor.logoUrl}
                alt={sponsor.name}
                fill
                className="object-cover p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <span className="inline-block px-4 py-1.5 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-full mb-4 backdrop-blur-sm border border-yellow-500/30">
                {sponsor.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {sponsor.name}
              </h1>
              <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl">
                {sponsor.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & About */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Section */}
            <section className="rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                Galeria
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sponsor.galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`${sponsor.name} - Foto ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                Contato
              </h2>
              <div className="space-y-3">
                {sponsor.whatsapp && (
                  <Link
                    href={`https://wa.me/${sponsor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5"
                  >
                    <FaWhatsapp size={22} />
                    WhatsApp
                  </Link>
                )}

                <Link
                  href={`tel:${sponsor.phone.replace(/\D/g, "")}`}
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  <FaPhone size={18} />
                  Ligar
                </Link>

                <Link
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
                >
                  <FaGlobe size={18} />
                  Visitar Site
                </Link>
              </div>
            </div>

            {/* Info Cards */}
            <div className="rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                Informações
              </h2>
              <div className="space-y-5">
                {/* Endereço */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-neutral-800/80 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Endereço</p>
                    <p className="text-white">{sponsor.address}</p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-neutral-800/80 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Telefone</p>
                    <p className="text-white">{sponsor.phone}</p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-neutral-800/80 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    <FaClock size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Horário</p>
                    <p className="text-white">{sponsor.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {(sponsor.instagram || sponsor.facebook) && (
              <div className="rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                  Redes Sociais
                </h2>
                <div className="flex gap-4">
                  {sponsor.instagram && (
                    <Link
                      href={sponsor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5"
                    >
                      <FaInstagram size={22} />
                      <span className="hidden sm:inline">Instagram</span>
                    </Link>
                  )}
                  {sponsor.facebook && (
                    <Link
                      href={sponsor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                      <FaFacebookF size={20} />
                      <span className="hidden sm:inline">Facebook</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

