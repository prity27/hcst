import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/common/ReportShell";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { Users, TrendingUp, Award, Activity } from "lucide-react";
import { workers, productivity } from "@/lib/mock-data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/reports/productivity")({
  head: () => ({ meta: [{ title: "Worker Productivity — HCTS" }] }),
  component: () => (
    <ReportShell
      title="Worker Productivity"
      description="Crew output analytics (aggregated from mobile scans)"
      kpis={
        <>
          <StatCard label="Workers Active" value="384" delta="+12" icon={<Users className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Avg Output" value="1,540 kg" delta="+3.8%" icon={<TrendingUp className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="Top Crew" value="Crew C" icon={<Award className="h-4.5 w-4.5" />} accent="primary" />
          <StatCard label="Hours Logged" value="6,240" delta="+8.1%" icon={<Activity className="h-4.5 w-4.5" />} accent="earth" />
        </>
      }
      chart={
        <>
          <div>
            <h3 className="text-base font-semibold">Output by Crew</h3>
            <p className="text-xs text-muted-foreground">Total kg harvested</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productivity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 140)" />
              <XAxis dataKey="crew" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="kg" fill="oklch(0.48 0.11 148)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </>
      }
      table={
        <DataTable
          data={workers.slice(0, 30)}
          bulkActions={false}
          importExport={false}
          rowActions={false}
          columns={[
            { key: "code", header: "Code", className: "font-mono text-xs" },
            { key: "name", header: "Worker", render: (r) => <span className="font-medium">{r.name}</span> },
            { key: "role", header: "Role" },
            { key: "company", header: "Company", className: "text-muted-foreground" },
            { key: "qrCard", header: "QR Card", className: "font-mono text-xs" },
            { key: "status", header: "Status" },
          ]}
        />
      }
    />
  ),
});
