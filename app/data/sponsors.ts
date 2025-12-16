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
  
];

export function getSponsorBySlug(slug: string): Sponsor | undefined {
  return SPONSORS.find((sponsor) => sponsor.slug === slug);
}

export function getAllSponsorSlugs(): string[] {
  return SPONSORS.map((sponsor) => sponsor.slug);
}

