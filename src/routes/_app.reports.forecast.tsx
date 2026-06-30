import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/common/ReportShell";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { GitCompare, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { harvestTrend, campaigns } from "@/lib/mock-data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/_app/reports/forecast")({
  head: () => ({ meta: [{ title: "Forecast vs Actual — HCTS" }] }),
  component: () => (
    <ReportShell
      title="Forecast vs Actual"
      description="Plan accuracy and variance tracking"
      kpis={
        <>
          <StatCard label="Forecast Total" value="298,000 kg" icon={<Target className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Actual Total" value="284,420 kg" delta="-4.6%" trend="down" icon={<TrendingUp className="h-4.5 w-4.5" />} accent="warning" />
          <StatCard label="Variance" value="-13,580 kg" delta="-4.6%" trend="down" icon={<GitCompare className="h-4.5 w-4.5" />} accent="warning" />
          <StatCard label="Plots Off-Plan" value="9" icon={<AlertTriangle className="h-4.5 w-4.5" />} accent="warning" />
        </>
      }
      chart={
        <>
          <div>
            <h3 className="text-base font-semibold">Forecast vs Actual — daily</h3>
            <p className="text-xs text-muted-foreground">kg harvested per day</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={harvestTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 140)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="forecast" stroke="oklch(0.75 0.13 95)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="harvest" stroke="oklch(0.48 0.11 148)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </>
      }
      table={
        <DataTable
          data={campaigns}
          bulkActions={false}
          importExport={false}
          rowActions={false}
          columns={[
            { key: "code", header: "Code", className: "font-mono text-xs" },
            { key: "name", header: "Campaign" },
            { key: "season", header: "Season" },
            { key: "yield", header: "Forecast (kg)", className: "tabular-nums", render: (r) => r.yield.toLocaleString() },
            { key: "yield", header: "Actual (kg)", className: "tabular-nums", render: (r) => Math.round(r.yield * 0.95).toLocaleString() },
            { key: "status", header: "Status" },
          ]}
        />
      }
    />
  ),
});
