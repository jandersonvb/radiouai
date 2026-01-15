"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import {
  Play,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStats,
  getStatsForLastDays,
  getTodayPlays,
  getTodayPageViews,
  getTodaySponsorClicks,
  getTopSponsors,
  getTopPages,
  DailyStats,
  clearAnalytics,
} from "@/lib/analytics";
import { getSponsors, Sponsor } from "@/lib/sponsors";

export default function AnalyticsPage() {
  const [todayPlays, setTodayPlays] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [todayClicks, setTodayClicks] = useState(0);
  const [totalPlays, setTotalPlays] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState<DailyStats[]>([]);
  const [topSponsors, setTopSponsors] = useState<{ id: string; clicks: number }[]>([]);
  const [topPages, setTopPages] = useState<{ page: string; views: number }[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [period, setPeriod] = useState<7 | 30>(7);

  const loadStats = () => {
    const stats = getStats();
    setTodayPlays(getTodayPlays());
    setTodayViews(getTodayPageViews());
    setTodayClicks(getTodaySponsorClicks());
    setTotalPlays(stats.totalPlays);
    setWeeklyStats(getStatsForLastDays(period));
    setTopSponsors(getTopSponsors(period));
    setTopPages(getTopPages(period));
    setSponsors(getSponsors());
  };

  useEffect(() => {
    loadStats();
  }, [period]);

  const getSponsorName = (id: string): string => {
    const sponsor = sponsors.find((s) => s.id === id);
    return sponsor?.name || id;
  };

  const getMaxPlays = () => {
    if (weeklyStats.length === 0) return 1;
    return Math.max(...weeklyStats.map((s) => s.plays), 1);
  };

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split("-");
    return `${day}/${month}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <AdminHeader
        title="Analytics"
        subtitle="Métricas e estatísticas de uso"
      />

      <div className="p-8 space-y-8">
        {/* Period Selector & Refresh */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={period === 7 ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(7)}
              className={
                period === 7
                  ? "bg-red-600 hover:bg-red-500"
                  : "border-neutral-700 text-neutral-300"
              }
            >
              7 dias
            </Button>
            <Button
              variant={period === 30 ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(30)}
              className={
                period === 30
                  ? "bg-red-600 hover:bg-red-500"
                  : "border-neutral-700 text-neutral-300"
              }
            >
              30 dias
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadStats}
            className="border-neutral-700 text-neutral-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-600 to-green-700">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Plays Hoje</p>
                <p className="text-2xl font-bold text-white">{todayPlays}</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Visitas Hoje</p>
                <p className="text-2xl font-bold text-white">{todayViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Cliques Parceiros</p>
                <p className="text-2xl font-bold text-white">{todayClicks}</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-600 to-orange-700">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Total Plays</p>
                <p className="text-2xl font-bold text-white">{totalPlays}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plays Chart */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <h2 className="text-lg font-semibold text-white">
                Plays por Dia
              </h2>
            </div>

            {weeklyStats.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-neutral-500">
                Nenhum dado disponível
              </div>
            ) : (
              <div className="space-y-3">
                {weeklyStats.slice(-7).map((stat) => (
                  <div key={stat.date} className="flex items-center gap-4">
                    <span className="text-neutral-400 text-sm w-12">
                      {formatDate(stat.date)}
                    </span>
                    <div className="flex-1 h-6 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${(stat.plays / getMaxPlays()) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-white font-medium w-8 text-right">
                      {stat.plays}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Sponsors */}
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-neutral-400" />
              <h2 className="text-lg font-semibold text-white">
                Top Patrocinadores
              </h2>
            </div>

            {topSponsors.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-neutral-500">
                Nenhum clique registrado
              </div>
            ) : (
              <div className="space-y-4">
                {topSponsors.slice(0, 5).map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : index === 1
                            ? "bg-neutral-400/20 text-neutral-300"
                            : index === 2
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-neutral-800 text-neutral-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-white">
                        {getSponsorName(item.id)}
                      </span>
                    </div>
                    <span className="text-neutral-400">
                      {item.clicks} clique{item.clicks !== 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-5 h-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-white">
              Páginas Mais Visitadas
            </h2>
          </div>

          {topPages.length === 0 ? (
            <div className="h-24 flex items-center justify-center text-neutral-500">
              Nenhuma visita registrada
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topPages.slice(0, 6).map((item) => (
                <div
                  key={item.page}
                  className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl"
                >
                  <span className="text-white truncate">{item.page}</span>
                  <span className="text-neutral-400 ml-4">{item.views}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-blue-400 text-sm">
            <strong>Nota:</strong> As métricas são armazenadas localmente no
            navegador. Para estatísticas mais precisas em produção, considere
            integrar com Google Analytics ou similar.
          </p>
        </div>
      </div>
    </div>
  );
}
