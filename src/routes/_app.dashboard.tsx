import { createFileRoute } from "@tanstack/react-router";
import {
  Sprout,
  Users,
  MapPin,
  QrCode,
  ScanLine,
  PackageCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  UsersRound,
  Satellite,
  Ratio,
  Target,
} from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusChip } from "@/components/common/StatusChip";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  harvestTrend,
  productivity,
  harvestByVariety,
  dispatchStatus,
  activities,
  upcomingHarvests,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HCTS" },
      { name: "description", content: "Live operations overview for harvest, QR, and dispatch." },
    ],
  }),
  component: Dashboard,
});

const CHART_COLORS = ["oklch(0.48 0.11 148)", "oklch(0.62 0.14 145)", "oklch(0.75 0.13 95)", "oklch(0.55 0.06 60)", "oklch(0.58 0.12 230)"];

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Operations Dashboard"
        description="Real-time overview of your harvesting campaign"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Today
            </Button>
            <Button size="sm">View Reports</Button>
          </>
        }
      />

      <div className="space-y-6 p-6">
        {/* Active campaign banner */}
        <Card className="relative overflow-hidden border-border p-6 shadow-card bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/80">
                <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" /> Active Campaign
              </div>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight">
                Avocado Campaign 2026 — Hass Premium
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/80">
                C-2026-001 · Season 2025/2026 · Started Jun 1, 2026 · 14 farms · 86 plots
              </p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">Progress</p>
                <p className="text-2xl font-semibold tabular-nums">62%</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">Days remaining</p>
                <p className="text-2xl font-semibold tabular-nums">47</p>
              </div>
            </div>
          </div>
        </Card>

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <StatCard label="Today's Harvest" value="24,180 kg" delta="+8.4%" icon={<Sprout className="h-4.5 w-4.5" />} accent="primary" />
          <StatCard label="Active Crews" value="18" delta="+2" icon={<UsersRound className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Satellite Staff" value="42" delta="+4" icon={<Satellite className="h-4.5 w-4.5" />} accent="earth" />
          <StatCard label="Satellite / Picker" value="1 : 9.1" icon={<Ratio className="h-4.5 w-4.5" />} accent="warning" />
          <StatCard label="Forecast Progress" value="62%" delta="+3.1%" icon={<Target className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="Total Workers" value="384" delta="+12" icon={<Users className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Active Farms" value="14" delta="+2" icon={<MapPin className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="QR Codes Generated" value="48,200" delta="+1.2%" icon={<QrCode className="h-4.5 w-4.5" />} accent="earth" />
          <StatCard label="QR Codes Scanned at Collection" value="28,617" delta="+4.8%" icon={<ScanLine className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="Today's Dispatch" value="18,420 kg" delta="+3.2%" icon={<PackageCheck className="h-4.5 w-4.5" />} accent="primary" />
          <StatCard label="Trucks Dispatched" value="22" delta="+5" icon={<Truck className="h-4.5 w-4.5" />} accent="info" />
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-border p-6 shadow-card gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Harvest Trend</h3>
                <p className="text-xs text-muted-foreground">Last 14 days — actual vs forecast (kg)</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Actual</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-3" /> Forecast</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={harvestTrend} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="harvestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.48 0.11 148)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.48 0.11 148)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 140)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "oklch(0.50 0.02 140)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.50 0.02 140)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 140)", fontSize: 12 }} />
                <Area type="monotone" dataKey="harvest" stroke="oklch(0.48 0.11 148)" strokeWidth={2} fill="url(#harvestGrad)" />
                <Area type="monotone" dataKey="forecast" stroke="oklch(0.75 0.13 95)" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-border p-6 shadow-card gap-4">
            <div>
              <h3 className="text-base font-semibold">Dispatch Status</h3>
              <p className="text-xs text-muted-foreground">Active shipments</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={dispatchStatus} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
                  {dispatchStatus.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 140)", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border p-6 shadow-card gap-4">
            <div>
              <h3 className="text-base font-semibold">Worker Productivity</h3>
              <p className="text-xs text-muted-foreground">Output by crew (kg)</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={productivity} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 140)" />
                <XAxis dataKey="crew" tick={{ fontSize: 11, fill: "oklch(0.50 0.02 140)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.50 0.02 140)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 140)", fontSize: 12 }} />
                <Bar dataKey="kg" fill="oklch(0.48 0.11 148)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-border p-6 shadow-card gap-4">
            <div>
              <h3 className="text-base font-semibold">Harvest by Variety</h3>
              <p className="text-xs text-muted-foreground">Total kg this campaign</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={harvestByVariety} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="oklch(0.92 0.01 140)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "oklch(0.50 0.02 140)" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "oklch(0.50 0.02 140)" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 140)", fontSize: 12 }} />
                <Bar dataKey="value" fill="oklch(0.62 0.14 145)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Activity + Schedule */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border p-6 shadow-card gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Recent Activity</h3>
                <p className="text-xs text-muted-foreground">Latest operational events</p>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <ol className="relative space-y-4 border-l border-border pl-4">
              {activities.map((a) => {
                const Icon = a.type === "success" ? CheckCircle2 : a.type === "warning" ? AlertTriangle : Info;
                const color =
                  a.type === "success" ? "bg-success/15 text-success" :
                  a.type === "warning" ? "bg-warning/20 text-warning-foreground" :
                  "bg-info/15 text-info";
                return (
                  <li key={a.id} className="relative">
                    <span className={`absolute -left-[26px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-card ${color}`}>
                      <Icon className="h-3 w-3" />
                    </span>
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Card className="border-border p-6 shadow-card gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Upcoming Harvest Schedule</h3>
                <p className="text-xs text-muted-foreground">Next 5 assignments</p>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
            <ul className="divide-y divide-border">
              {upcomingHarvests.map((h) => (
                <li key={h.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                      <span className="text-[10px] uppercase">Jun</span>
                      <span className="text-sm font-semibold leading-none">{h.date.slice(-2)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{h.farm}</p>
                      <p className="truncate text-xs text-muted-foreground">{h.plot} · {h.variety} · {h.crew}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="font-medium">{h.workers} workers</Badge>
                    <StatusChip status={h.status} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
