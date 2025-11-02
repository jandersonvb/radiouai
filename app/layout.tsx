// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import { PlayerProvider } from "./contexts/PlayerContext";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Rádio Uai",
  description: "Ouça a Rádio Uai ao vivo com nossa transmissão online.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  player: React.ReactNode; // <- slot para @player
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-black text-white">
        <PlayerProvider>
          <Header />
          {children}
          <Player />
        </PlayerProvider>
      </body>
    </html>
  );
}
