// lib/sponsors.ts

export type Sponsor = {
  id: string;
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
  active: boolean;
  order: number;
};

export type SponsorsData = {
  sponsors: Sponsor[];
};

// Storage key para localStorage
const SPONSORS_STORAGE_KEY = "radiouai_sponsors";

// Dados iniciais (fallback)
const initialSponsors: SponsorsData = {
  sponsors: [
    {
      id: "1",
      slug: "mauro-sorvetes",
      name: "Mauro Sorvetes",
      description:
        "Há mais de 30 anos oferecendo os melhores sorvetes de Itajubá! Nossa sorveteria é referência em qualidade, sabor e tradição. Venha experimentar nossos sorvetes artesanais, picolés, açaí e muito mais. Um lugar perfeito para reunir a família e os amigos.",
      category: "Sorveteria",
      logoUrl: "/mauro/mauro_logo.png",
      galleryImages: ["/mauro/foto_1.jpg", "/mauro/foto_2.jpg", "/mauro/foto_3.jpg"],
      address: "R. Oswaldo Cruz, 400 - Varginha, Itajubá - MG, 37501-168",
      phone: "(35) 3622-7520",
      hours: "Segunda a Domingo: 11h às 20h",
      href: "https://www.maurosorveteriaitajuba.com.br/",
      whatsapp: "553536227520",
      instagram: "https://www.instagram.com/maurosorvetes/",
      facebook: "",
      active: true,
      order: 0,
    },
  ],
};

// Funções de gerenciamento de sponsors

export function getSponsorsData(): SponsorsData {
  if (typeof window === "undefined") {
    return initialSponsors;
  }

  const stored = localStorage.getItem(SPONSORS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialSponsors;
    }
  }
  return initialSponsors;
}

export function saveSponsorsData(data: SponsorsData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SPONSORS_STORAGE_KEY, JSON.stringify(data));
}

export function getSponsors(): Sponsor[] {
  const data = getSponsorsData();
  return data.sponsors.sort((a, b) => a.order - b.order);
}

export function getActiveSponsors(): Sponsor[] {
  return getSponsors().filter((s) => s.active);
}

export function getSponsorById(id: string): Sponsor | undefined {
  return getSponsors().find((s) => s.id === id);
}

export function getSponsorBySlug(slug: string): Sponsor | undefined {
  return getSponsors().find((s) => s.slug === slug);
}

export function createSponsor(sponsor: Omit<Sponsor, "id">): Sponsor {
  const data = getSponsorsData();
  const newId = String(Date.now());
  const newSponsor: Sponsor = {
    ...sponsor,
    id: newId,
  };
  data.sponsors.push(newSponsor);
  saveSponsorsData(data);
  return newSponsor;
}

export function updateSponsor(id: string, updates: Partial<Sponsor>): Sponsor | null {
  const data = getSponsorsData();
  const index = data.sponsors.findIndex((s) => s.id === id);
  if (index === -1) return null;

  data.sponsors[index] = { ...data.sponsors[index], ...updates };
  saveSponsorsData(data);
  return data.sponsors[index];
}

export function deleteSponsor(id: string): boolean {
  const data = getSponsorsData();
  const index = data.sponsors.findIndex((s) => s.id === id);
  if (index === -1) return false;

  data.sponsors.splice(index, 1);
  saveSponsorsData(data);
  return true;
}

export function reorderSponsors(sponsorIds: string[]): void {
  const data = getSponsorsData();
  sponsorIds.forEach((id, index) => {
    const sponsor = data.sponsors.find((s) => s.id === id);
    if (sponsor) {
      sponsor.order = index;
    }
  });
  saveSponsorsData(data);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllSponsorSlugs(): string[] {
  return getSponsors().map((s) => s.slug);
}
