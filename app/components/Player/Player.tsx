"use client";

import { usePlayer } from "@/app/contexts/PlayerContext";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    progress,
    duration,
  } = usePlayer();

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed bottom-0 z-50 left-0 w-full bg-black backdrop-blur-sm p-3">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 rounded-lg bg-black p-2 sm:flex-wrap sm:flex-row">
        <div className="w-16 h-16 flex-shrink-0 relative">
          <Image
            src="/logo_uai.jpg"
            alt="Radio Uai Logo"
            fill
            className="object-cover rounded-full"
          />
        </div>

        <Button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white"
        >
          {playing ? (
            <Pause size={20} strokeWidth={0} fill="#000" />
          ) : (
            <Play size={20} strokeWidth={0} fill="#000" />
          )}
        </Button>

        <div className="flex-1 flex flex-col items-center gap-2 sm:flex-row">
          <div className="relative w-full h-1 rounded-full bg-gray-800">
            <div
              className="absolute top-0 left-0 h-full bg-yellow-400"
              style={{ width: `${(progress / (duration || 1)) * 100}%` }}
            />
          </div>
          <span className="text-white text-sm">{fmt(progress)}</span>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            {muted ? (
              <VolumeOff
                size={20}
                className="text-white cursor-pointer"
                onClick={() => {
                  const audio = audioRef.current!;
                  audio.muted = false;
                  setMuted(false);
                }}
              />
            ) : (
              <Volume2
                size={20}
                className="text-white cursor-pointer"
                onClick={() => {
                  const audio = audioRef.current!;
                  audio.muted = true;
                  setMuted(true);
                }}
              />
            )}
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
              className="w-24 h-1 bg-gray-800 rounded-full cursor-pointer sm:w-16"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="https://www.instagram.com/radiouai_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaInstagram size={25} />
            </Link>
            <Link
              href="https://www.facebook.com/radiouaioficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaFacebook size={25} />
            </Link>
            <Link
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaSpotify size={25} />
            </Link>
          </div>
        </div>

        <audio
          ref={audioRef}
          src="https://streaming.radios.com.br:8020/stream"
          autoPlay
          loop
        />
      </div>
    </div>
  );
}
