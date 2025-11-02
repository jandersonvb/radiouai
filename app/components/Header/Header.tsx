// // src/components/Header.tsx
// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// import Image from "next/image";
// import { Bubbles, Calendar } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="flex items-center justify-between px-4 py-3 border-b bg-black">
//       <Link href="/">
//         <Image
//           src="/logo_uai.jpg"
//           alt="Radio Uai Logo"
//           width={150}
//           height={150}
//           className="rounded-full"
//           priority
//         />
//       </Link>
//       <nav className="flex items-center gap-4">
//         <Link
//           href="/programacao"
//           className="text-sm font-medium text-gray-200 hover:text-white flex items-center gap-1"
//         >
//           <Calendar className="w-4 h-4" />
//           Programação
//         </Link>
//         <Link
//           href="/podcasts"
//           className="text-sm font-medium text-gray-200 hover:text-white flex items-center gap-1"
//         >
//           <Bubbles className="w-4 h-4" />
//           Patrocinadores
//         </Link>
//         <Link href="/assinatura">
//           <Button>Assine</Button>
//         </Link>
//       </nav>
//     </header>
//   );
// }
"use client";
import { BookA, Home, Menu, Newspaper } from "lucide-react";
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
    href: "/noticias",
    label: "Notícias",
    icons: <Newspaper className="h-4 w-4 opacity-70" />,
  },
  {
    href: "/agenda",
    label: "Agenda",
    icons: <BookA className="h-4 w-4 opacity-70" />,
  },
  // {
  //   href: "/businesses",
  //   label: "Comércios",
  //   icons: <LucideBriefcaseBusiness className="h-4 w-4 opacity-70" />,
  // },
  // {
  //   href: "/radio",
  //   label: "Rádio",
  //   icons: <Radio className="h-4 w-4 opacity-70" />,
  // },
];

export default function Header({ city = "itajuba" }: { city?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-black backdrop-blur">
      <div className="mx-auto flex h-22 max-w-6xl items-center justify-between px-4">
        <>
          <Link href="/">
            <Image
              src="/logo_uai.jpg"
              alt="Radio Uai Logo"
              width={150}
              height={150}
              className="rounded-full"
              priority
            />
          </Link>
        </>

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
            className="text-gray-100 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          {open && (
            <div className="absolute top-16 left-0 w-full bg-black shadow-lg">
              <nav className="flex flex-col items-start gap-4 p-4">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href.replace("[city]", city)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-gray-100 hover:text-white transition-colors"
                  >
                    {n.icons}
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
