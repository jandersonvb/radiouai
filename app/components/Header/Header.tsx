"use client";
import { Globe, Home, Menu, Star } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const nav = [
  {
    href: "/",
    label: "Início",
    icons: <Home className="h-4 w-4 opacity-70" />,
  },
  {
    href: "/cidades",
    label: "Cidades",
    icons: <Globe className="h-4 w-4 opacity-70" />,
  },
  {
    href: "/patrocinadores",
    label: "Patrocinadores",
    icons: <Star className="h-4 w-4 opacity-70" />,
  },
];

export default function Header({ city = "itajuba" }: { city?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-black backdrop-blur border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-4 py-1.5 md:px-0">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo_uai.png"
            alt="Radio Uai Logo"
            width={64}
            height={64}
            priority
            className="h-14 w-14 sm:h-16 sm:w-16"
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
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="md:hidden">
            <SheetTrigger asChild>
              <button
                className="rounded-md p-2 text-gray-100 transition-colors hover:text-white hover:bg-zinc-900"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
          </div>

          <SheetContent
            side="left"
            className="w-[84vw] max-w-xs border-zinc-800 bg-black p-0 text-white [&>button]:text-zinc-300 [&>button]:hover:text-white"
          >
            <SheetHeader className="border-b border-zinc-800 px-4 py-4 text-left">
              <SheetTitle className="text-white">Radio Uai</SheetTitle>
              <SheetDescription className="text-zinc-400">
                Menu de navegacao
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1 p-3">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href.replace("[city]", city)}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-100 transition-colors hover:bg-zinc-900 hover:text-white"
                >
                  {n.icons}
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t border-zinc-800 px-4 py-3 text-xs text-zinc-400">
              Mais que uma radio!
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
