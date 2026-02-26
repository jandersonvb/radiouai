// app/data/sponsors.ts

export type Sponsor = {
  slug: string;
  name: string;
  description: string;
  category: string;
  logoUrl: string;
  galleryImages: string[];
  address: string;
  phone: string;
  hours: string;
  href: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
};

export const SPONSORS: Sponsor[] = [
  {
    slug: "mauro-sorvetes",
    name: "Mauro Sorvetes",
    description:
      "Há mais de 30 anos oferecendo os melhores sorvetes de Itajubá! Nossa sorveteria é referência em qualidade, sabor e tradição. Venha experimentar nossos sorvetes artesanais, picolés, açaí e muito mais. Um lugar perfeito para reunir a família e os amigos.",
    category: "Sorveteria",
    logoUrl: "/mauro/mauro_logo.png",
    galleryImages: [
      "/mauro/foto_1.jpg",
      "/mauro/foto_2.jpg",
      "/mauro/foto_3.jpg",
    ],
    address: "R. Oswaldo Cruz, 400 - Varginha, Itajubá - MG, 37501-168",
    phone: "(35) 3622-7520",
    hours: "Segunda a Domingo: 11h às 20h",
    href: "https://www.maurosorveteriaitajuba.com.br/",
    whatsapp: "553536227520",
    instagram: "https://www.instagram.com/maurosorvetes/",
  },
  {
    slug: "pro-saude-itajuba",
    name: "Pro-Saúde Materiais Odontomédicos",
    description:
      "A Pro-Saúde Materiais Odontomedico Comercio e Representacoes atua ha mais de 29 anos em Itajuba com produtos medicos, hospitalares e odontologicos. A loja oferece andadores, almofadas terapeuticas (Perfetto), materiais ortopedicos e solucoes para conforto e mobilidade. Contato: prosaudeitajuba@gmail.com.",
    category: "Materiais Medicos",
    logoUrl: "/prosaude/prosaude_logo.svg",
    galleryImages: ["/prosaude/prosaude_banner.svg"],
    address: "Rua Miguel Viana, 234 - Morro Chic, Itajuba - MG",
    phone: "(35) 3623-5033",
    hours: "Consulte horarios de atendimento pelo WhatsApp.",
    href: "https://www.google.com/maps/search/?api=1&query=Rua+Miguel+Viana+234+Morro+Chic+Itajuba+MG",
    whatsapp: "5535988639024",
    instagram: "https://www.instagram.com/prosaudeitajuba/",
  },
];

const CITY_UF_DASH_REGEX = /,\s*([^,]+?)\s*-\s*([A-Za-z]{2})\s*(?:,|$)/u;
const CITY_UF_SLASH_REGEX = /,\s*([^,\/]+?)\s*\/\s*([A-Za-z]{2})\s*(?:,|$)/u;

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function parseCityAndUf(address: string): { city: string; uf: string } | null {
  const dashed = address.match(CITY_UF_DASH_REGEX);
  if (dashed) {
    return { city: dashed[1].trim(), uf: dashed[2].trim() };
  }

  const slashed = address.match(CITY_UF_SLASH_REGEX);
  if (slashed) {
    return { city: slashed[1].trim(), uf: slashed[2].trim() };
  }

  return null;
}

export function isSponsorFromCityAddress(
  address: string,
  city: string,
  uf: string
): boolean {
  const parsed = parseCityAndUf(address);
  const normalizedCity = normalizeText(city);
  const normalizedUf = normalizeText(uf);

  if (parsed) {
    const sameCity = normalizeText(parsed.city) === normalizedCity;
    const sameUf = normalizeText(parsed.uf) === normalizedUf;
    return sameCity && sameUf;
  }

  const normalizedAddress = normalizeText(address);
  if (!normalizedAddress.includes(normalizedCity)) {
    return false;
  }

  return (
    normalizedAddress.includes(`- ${normalizedUf}`) ||
    normalizedAddress.includes(`/${normalizedUf}`) ||
    normalizedAddress.includes(` ${normalizedUf},`)
  );
}

export function getSponsorsByCity(city: string, uf: string): Sponsor[] {
  return SPONSORS.filter((sponsor) =>
    isSponsorFromCityAddress(sponsor.address, city, uf)
  );
}

export function getSponsorBySlug(slug: string): Sponsor | undefined {
  return SPONSORS.find((sponsor) => sponsor.slug === slug);
}

export function getAllSponsorSlugs(): string[] {
  return SPONSORS.map((sponsor) => sponsor.slug);
}

