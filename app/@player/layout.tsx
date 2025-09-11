import Player from "../components/Player/Player";
import { PlayerProvider } from "../contexts/PlayerContext";


export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      {children}
      <Player /> {/* Sempre visível, nunca desmontado */}
    </PlayerProvider>
  );
}
