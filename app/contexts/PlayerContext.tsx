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
  progress: number;
  duration: number;
  togglePlay: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (vol: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const WORKER_URL = "https://canall10-stream.jandersonvb-dev.workers.dev";

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = WORKER_URL;
      audio.crossOrigin = "anonymous";
      audio.load();
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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
        progress,
        duration,
        togglePlay,
        setMuted,
        setVolume,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        preload="none"
        src="https://canall10-stream.jandersonvb-dev.workers.dev"
        crossOrigin="anonymous"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
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
