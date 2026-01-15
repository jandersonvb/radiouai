"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import Player from "./Player/Player";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    // No admin, não mostra Header nem Player
    return <>{children}</>;
  }

  // Nas outras páginas, mostra Header e Player
  return (
    <>
      <Header />
      {children}
      <Player />
    </>
  );
}
