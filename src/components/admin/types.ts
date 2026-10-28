export type Totals = {
  visitors: number;
  visits: number;
  pageViews: number;
  caseViews: number;
  resumeViews: number;
  resumeDownloads: number;
  resumeShares: number;
  newVisitors: number;
  returningVisitors: number;
  contactClicks: number;
  reachedEnd: number;
};
export type Breakdown = { label: string; count: number };
export type AnalyticsReport = {
  totals: Totals;
  previousTotals: Totals;
  updatedAt: string;
  series: import("@/lib/admin/chart").SeriesPoint[];
  funnel: {
    visits: number;
    caseStudies: number;
    resume: number;
    downloads: number;
    shares: number;
    contacts: number;
  };
  cases: {
    path: string;
    views: number;
    readers: number;
    completed: number;
    active_seconds: number;
  }[];
  sections: {
    path: string;
    label: string;
    section_id: string;
    visits: number;
  }[];
  sources: Breakdown[];
  devices: Breakdown[];
  browsers: Breakdown[];
  pages: Breakdown[];
  campaigns: Breakdown[];
  placements: {
    label: string;
    views: number;
    downloads: number;
    shares: number;
  }[];
  live: {
    id: string;
    current_path: string;
    device: string;
    browser: string;
    last_seen_at: string;
  }[];
};
export type ActivityRow = {
  id: string;
  name?: string;
  path?: string;
  occurred_at?: string;
  visit_id?: string;
  browser_id: string;
  device: string;
  browser: string;
  referrer: string | null;
  params?: Record<string, unknown>;
  first_seen_at?: string;
  last_seen_at?: string;
  landing_path?: string;
  current_path?: string;
  is_internal?: boolean;
  is_bot?: boolean;
  event_count?: number;
};
export type ActivityResult = { total: number; rows: ActivityRow[] };
