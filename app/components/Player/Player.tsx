"use client";

import { usePlayer } from "@/app/contexts/PlayerContext";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaSpotify } from "react-icons/fa";

export default function Player() {
  const {
    audioRef,
    togglePlay,
    playing,
    volume,
    setVolume,
    muted,
    setMuted,
  } = usePlayer();

  const staticText = "Mais que uma rádio!";

  return (
    <div className="fixed bottom-0 z-50 left-0 w-full bg-black backdrop-blur-sm p-2 sm:p-3">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 py-2 sm:py-3 px-3 sm:px-4 md:px-0">
        {/* Logo e Play Button - Linha 1 em mobile */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-16 sm:h-16 flex-shrink-0 relative">
            <Image
              src="/logo_uai.jpg"
              alt="Radio Uai Logo"
              quality={100}
              priority
              fill
              className="object-cover rounded-full"
            />
          </div>

          <Button
            onClick={togglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d91e25] flex items-center justify-center hover:bg-[#b0171c] transition"
          >
            {playing ? (
              <Pause size={18} strokeWidth={0} fill="#fff" className="sm:w-5 sm:h-5" />
            ) : (
              <Play size={18} strokeWidth={0} fill="#fff" className="sm:w-5 sm:h-5" />
            )}
          </Button>

          <div className="flex-1 flex flex-col gap-0.5 sm:hidden">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-red-500 text-[10px] font-semibold uppercase tracking-wider">
                Ao Vivo
              </span>
            </div>
            <span className="text-white text-[11px] truncate" title={staticText}>
              {staticText}
            </span>
          </div>
        </div>

        {/* Info - Desktop */}
        <div className="hidden sm:flex flex-1 flex-col gap-1 ml-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              Ao Vivo
            </span>
          </div>
          <span className="text-white text-sm truncate max-w-xs" title={staticText}>
            {staticText}
          </span>
        </div>

        {/* Volume e Redes Sociais - Linha 2 em mobile */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {muted ? (
              <VolumeOff
                size={16}
                className="text-white cursor-pointer sm:w-5 sm:h-5"
                onClick={() => {
                  const audio = audioRef.current!;
                  audio.muted = false;
                  setMuted(false);
                }}
              />
            ) : (
              <Volume2
                size={16}
                className="text-white cursor-pointer sm:w-5 sm:h-5"
                onClick={() => {
                  const audio = audioRef.current!;
                  audio.muted = true;
                  setMuted(true);
                }}
              />
            )}
            <div className="relative w-16 sm:w-20 h-1">
              <div className="absolute w-full h-full bg-gray-600 rounded-lg"></div>
              <div
                className="absolute h-full bg-[#d91e28] rounded-lg transition-all duration-150"
                style={{ width: `${volume * 100}%` }}
              ></div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  const audio = audioRef.current!;
                  audio.volume = vol;
                  setVolume(vol);
                  if (vol === 0) {
                    audio.muted = true;
                    setMuted(true);
                  } else if (muted) {
                    audio.muted = false;
                    setMuted(false);
                  }
                }}
                className="absolute w-full h-full bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:border-none" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="https://www.instagram.com/radiouai_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#d91e28] transition"
            >
              <FaInstagram size={18} className="sm:w-6 sm:h-6" />
            </Link>
            <Link
              href="https://www.facebook.com/radiouaioficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#d91e28] transition"
            >
              <FaFacebook size={18} className="sm:w-6 sm:h-6" />
            </Link>
            <Link
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#d91e28] transition"
            >
              <FaSpotify size={18} className="sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
