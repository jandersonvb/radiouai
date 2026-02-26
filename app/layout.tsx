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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  }
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  player: React.ReactNode; // <- slot para @player
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-white text-zinc-900 overflow-x-hidden">
        <PlayerProvider>
          <Header />
          <main className="bg-gradient-to-b from-[#fff8f8] via-[#f8fafc] to-[#f3f4f6] text-zinc-900">
            {children}
          </main>
          <Player />
        </PlayerProvider>
      </body>
    </html>
  );
}
