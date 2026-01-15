// app/components/Home/SponsorsSection.tsx
"use client";

import Link from "next/link";
import { SponsorCard } from "./SponsorCard";
import { useEffect, useState } from "react";
import { Sponsor, getActiveSponsors } from "@/lib/sponsors";

export function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsors(getActiveSponsors());
  }, []);

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 md:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Nossos Patrocinadores
        </h2>
        <Link
          href="/anuncie"
          className="text-sm text-yellow-400 hover:underline whitespace-nowrap"
        >
          Seja um
        </Link>
      </div>

      {/* Grade responsiva de logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.slug} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}
