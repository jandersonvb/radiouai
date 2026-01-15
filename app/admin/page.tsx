"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "./components/AdminHeader";
import {
  Users,
  Calendar,
  Play,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { getActiveSponsors } from "@/lib/sponsors";
import { getActivePrograms } from "@/lib/schedule";
import { getTodayPlays, getTodayPageViews } from "@/lib/analytics";

const quickActions = [
  {
    title: "Adicionar Patrocinador",
    description: "Cadastre um novo parceiro comercial",
    href: "/admin/patrocinadores",
    icon: Users,
  },
  {
    title: "Editar Programação",
    description: "Atualize a grade de programas",
    href: "/admin/programacao",
    icon: Calendar,
  },
];

export default function AdminDashboard() {
  const [sponsorsCount, setSponsorsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  const [todayPlays, setTodayPlays] = useState(0);
  const [todayViews, setTodayViews] = useState(0);

  useEffect(() => {
    setSponsorsCount(getActiveSponsors().length);
    setProgramsCount(getActivePrograms().length);
    setTodayPlays(getTodayPlays());
    setTodayViews(getTodayPageViews());
  }, []);

  const stats = [
    {
      label: "Patrocinadores Ativos",
      value: String(sponsorsCount),
      change: "+0%",
      trend: "up" as const,
      icon: Users,
      href: "/admin/patrocinadores",
      color: "from-blue-600 to-blue-700",
    },
    {
      label: "Programas na Grade",
      value: String(programsCount),
      change: "+0%",
      trend: "up" as const,
      icon: Calendar,
      href: "/admin/programacao",
      color: "from-purple-600 to-purple-700",
    },
    {
      label: "Plays Hoje",
      value: String(todayPlays),
      change: "+0%",
      trend: "up" as const,
      icon: Play,
      href: "/admin/analytics",
      color: "from-green-600 to-green-700",
    },
    {
      label: "Visitas Hoje",
      value: String(todayViews),
      change: "+0%",
      trend: "up" as const,
      icon: TrendingUp,
      href: "/admin/analytics",
      color: "from-orange-600 to-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <AdminHeader
        title="Dashboard"
        subtitle="Visão geral do painel administrativo"
      />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-neutral-400 text-sm">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-neutral-800 group-hover:bg-red-600/20 transition-colors">
                    <action.icon className="w-6 h-6 text-neutral-400 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-red-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-neutral-500 text-sm">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Atividade Recente
          </h2>
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center">
              <p className="text-neutral-400">
                O histórico de atividades será exibido aqui após as primeiras
                ações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
