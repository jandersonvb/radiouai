// lib/analytics.ts

export type AnalyticsEvent = {
  type: "play" | "sponsor_click" | "page_view";
  data?: string;
  timestamp: number;
};

export type DailyStats = {
  date: string; // YYYY-MM-DD
  plays: number;
  sponsorClicks: Record<string, number>;
  pageViews: Record<string, number>;
};

export type AnalyticsData = {
  dailyStats: DailyStats[];
  totalPlays: number;
  totalSponsorClicks: number;
  totalPageViews: number;
};

const ANALYTICS_KEY = "radiouai_analytics";

function getToday(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

function getAnalyticsData(): AnalyticsData {
  if (typeof window === "undefined") {
    return {
      dailyStats: [],
      totalPlays: 0,
      totalSponsorClicks: 0,
      totalPageViews: 0,
    };
  }

  const stored = localStorage.getItem(ANALYTICS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {
        dailyStats: [],
        totalPlays: 0,
        totalSponsorClicks: 0,
        totalPageViews: 0,
      };
    }
  }
  return {
    dailyStats: [],
    totalPlays: 0,
    totalSponsorClicks: 0,
    totalPageViews: 0,
  };
}

function saveAnalyticsData(data: AnalyticsData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

function getTodayStats(): DailyStats {
  const data = getAnalyticsData();
  const today = getToday();
  let todayStats = data.dailyStats.find((s) => s.date === today);

  if (!todayStats) {
    todayStats = {
      date: today,
      plays: 0,
      sponsorClicks: {},
      pageViews: {},
    };
    data.dailyStats.push(todayStats);
    saveAnalyticsData(data);
  }

  return todayStats;
}

// Tracking functions

export function trackPlay(): void {
  const data = getAnalyticsData();
  const today = getToday();

  let todayStats = data.dailyStats.find((s) => s.date === today);
  if (!todayStats) {
    todayStats = {
      date: today,
      plays: 0,
      sponsorClicks: {},
      pageViews: {},
    };
    data.dailyStats.push(todayStats);
  }

  todayStats.plays += 1;
  data.totalPlays += 1;
  saveAnalyticsData(data);
}

export function trackSponsorClick(sponsorId: string): void {
  const data = getAnalyticsData();
  const today = getToday();

  let todayStats = data.dailyStats.find((s) => s.date === today);
  if (!todayStats) {
    todayStats = {
      date: today,
      plays: 0,
      sponsorClicks: {},
      pageViews: {},
    };
    data.dailyStats.push(todayStats);
  }

  todayStats.sponsorClicks[sponsorId] =
    (todayStats.sponsorClicks[sponsorId] || 0) + 1;
  data.totalSponsorClicks += 1;
  saveAnalyticsData(data);
}

export function trackPageView(page: string): void {
  const data = getAnalyticsData();
  const today = getToday();

  let todayStats = data.dailyStats.find((s) => s.date === today);
  if (!todayStats) {
    todayStats = {
      date: today,
      plays: 0,
      sponsorClicks: {},
      pageViews: {},
    };
    data.dailyStats.push(todayStats);
  }

  todayStats.pageViews[page] = (todayStats.pageViews[page] || 0) + 1;
  data.totalPageViews += 1;
  saveAnalyticsData(data);
}

// Retrieval functions

export function getStats(): AnalyticsData {
  return getAnalyticsData();
}

export function getTodayPlays(): number {
  return getTodayStats().plays;
}

export function getTodayPageViews(): number {
  const stats = getTodayStats();
  return Object.values(stats.pageViews).reduce((sum, count) => sum + count, 0);
}

export function getTodaySponsorClicks(): number {
  const stats = getTodayStats();
  return Object.values(stats.sponsorClicks).reduce(
    (sum, count) => sum + count,
    0
  );
}

export function getStatsForLastDays(days: number): DailyStats[] {
  const data = getAnalyticsData();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split("T")[0];

  return data.dailyStats
    .filter((s) => s.date >= cutoffStr)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getTopSponsors(days: number = 30): { id: string; clicks: number }[] {
  const stats = getStatsForLastDays(days);
  const clicksMap: Record<string, number> = {};

  stats.forEach((s) => {
    Object.entries(s.sponsorClicks).forEach(([id, clicks]) => {
      clicksMap[id] = (clicksMap[id] || 0) + clicks;
    });
  });

  return Object.entries(clicksMap)
    .map(([id, clicks]) => ({ id, clicks }))
    .sort((a, b) => b.clicks - a.clicks);
}

export function getTopPages(days: number = 30): { page: string; views: number }[] {
  const stats = getStatsForLastDays(days);
  const viewsMap: Record<string, number> = {};

  stats.forEach((s) => {
    Object.entries(s.pageViews).forEach(([page, views]) => {
      viewsMap[page] = (viewsMap[page] || 0) + views;
    });
  });

  return Object.entries(viewsMap)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views);
}

export function clearAnalytics(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANALYTICS_KEY);
}
