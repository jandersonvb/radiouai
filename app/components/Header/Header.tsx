"use client";
import { BookA, Home, Menu, Newspaper, Settings } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { useState } from "react";

const nav = [
  {
    href: "/",
    label: "Início",
    icons: <Home className="h-4 w-4 opacity-70" />,
  },
  {
    href: "/admin",
    label: "Admin",
    icons: <Settings className="h-4 w-4 opacity-70" />,
  },
];

export default function Header({ city = "itajuba" }: { city?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-black backdrop-blur border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between py-1.5 px-4 md:px-0">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo_uai.jpg"
            alt="Radio Uai Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href.replace("[city]", city)}
              className="flex items-center gap-2 text-white hover:text-[#d91e28] transition"
            >
              {n.icons}
              {n.label}
            </Link>
          ))}
        </nav>

        {/* mobile nav */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-gray-100 hover:text-white transition-colors p-2"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          {open && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setOpen(false)}
              />
              <div className="fixed top-16 left-0 right-0 bg-black shadow-lg z-50 border-t border-gray-800">
                <nav className="flex flex-col items-start gap-2 p-4">
                  {nav.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href.replace("[city]", city)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-gray-100 hover:text-white transition-colors w-full py-3 px-2 hover:bg-gray-900 rounded"
                    >
                      {n.icons}
                      {n.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
