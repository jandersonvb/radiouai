import { NewsSection } from "./components/Home/NewsSection";
import { ScheduleSection } from "./components/Home/ScheduleSection";
import { OnAirHero } from "./components/Home/OnAirHero";
import { YoutubeVideosSection } from "./components/Home/YoutubeVideosSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 space-y-10 pb-32">
        <OnAirHero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <YoutubeVideosSection />
          </div>

          <div className="lg:col-span-1">
            <ScheduleSection />
          </div>
        </div>

        <NewsSection />
      </div>
    </div>
  );
}
