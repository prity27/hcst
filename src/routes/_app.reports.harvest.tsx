import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/common/ReportShell";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { Sprout, MapPin, TrendingUp, Calendar } from "lucide-react";
import { harvestAssignments, harvestTrend } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/reports/harvest")({
  head: () => ({ meta: [{ title: "Harvest Reports — HCTS" }] }),
  component: () => (
    <ReportShell
      title="Harvest Report"
      description="Aggregate harvest performance for the active campaign"
      kpis={
        <>
          <StatCard label="Total Harvested" value="284,420 kg" delta="+12.4%" icon={<Sprout className="h-4.5 w-4.5" />} accent="primary" />
          <StatCard label="Plots Harvested" value="62 / 86" delta="+4" icon={<MapPin className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="Average Yield" value="3,310 kg/ha" delta="+2.1%" icon={<TrendingUp className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Days Active" value="29" icon={<Calendar className="h-4.5 w-4.5" />} accent="earth" />
        </>
      }
      chart={
        <>
          <div>
            <h3 className="text-base font-semibold">Daily harvest volume</h3>
            <p className="text-xs text-muted-foreground">kg harvested vs forecast</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={harvestTrend}>
              <defs>
                <linearGradient id="rh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.48 0.11 148)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.48 0.11 148)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 140)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="harvest" stroke="oklch(0.48 0.11 148)" strokeWidth={2} fill="url(#rh)" />
              <Area type="monotone" dataKey="forecast" stroke="oklch(0.75 0.13 95)" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </>
      }
      table={
        <DataTable
          data={harvestAssignments}
          bulkActions={false}
          importExport={false}
          rowActions={false}
          columns={[
            { key: "id", header: "ID", className: "font-mono text-xs" },
            { key: "date", header: "Date", className: "tabular-nums" },
            { key: "farm", header: "Farm" },
            { key: "plot", header: "Plot" },
            { key: "variety", header: "Variety" },
            { key: "crew", header: "Crew" },
            { key: "workers", header: "Workers", className: "tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      }
    />
  ),
});
