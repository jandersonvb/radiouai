"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

type PlayerContextType = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  muted: boolean;
  volume: number;
  togglePlay: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (vol: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// A URL do seu worker que funciona
const WORKER_URL = "https://canall10-stream.jandersonvb-dev.workers.dev";

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current!;
    if (!playing) {
      try {
        await audio.play();
      } catch (err) {
        console.error("Erro ao tocar o áudio:", err);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        playing,
        muted,
        volume,
        togglePlay,
        setMuted,
        setVolume,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="none"
        // MODIFICADO: Aponta para a URL do worker
        src={WORKER_URL}
        loop
        crossOrigin="anonymous"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};