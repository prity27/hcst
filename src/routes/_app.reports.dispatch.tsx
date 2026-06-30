import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/common/ReportShell";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { PackageCheck, Truck, Clock, AlertTriangle } from "lucide-react";
import { dispatchNotes, dispatchStatus } from "@/lib/mock-data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["oklch(0.48 0.11 148)", "oklch(0.62 0.14 145)", "oklch(0.75 0.13 95)", "oklch(0.55 0.06 60)"];

export const Route = createFileRoute("/_app/reports/dispatch")({
  head: () => ({ meta: [{ title: "Dispatch Reports — HCTS" }] }),
  component: () => (
    <ReportShell
      title="Dispatch Report"
      description="Shipment performance and on-time delivery"
      kpis={
        <>
          <StatCard label="Dispatched" value="184" delta="+22" icon={<PackageCheck className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="In Transit" value="18" icon={<Truck className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Avg Lead Time" value="2.4 days" delta="-0.3d" trend="up" icon={<Clock className="h-4.5 w-4.5" />} accent="primary" />
          <StatCard label="Delayed" value="3" delta="-2" trend="up" icon={<AlertTriangle className="h-4.5 w-4.5" />} accent="warning" />
        </>
      }
      chart={
        <>
          <div>
            <h3 className="text-base font-semibold">Shipment Status Distribution</h3>
            <p className="text-xs text-muted-foreground">Active dispatch notes</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={dispatchStatus} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {dispatchStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </>
      }
      table={
        <DataTable
          data={dispatchNotes}
          bulkActions={false}
          importExport={false}
          rowActions={false}
          columns={[
            { key: "id", header: "Note #", className: "font-mono text-xs" },
            { key: "date", header: "Date", className: "tabular-nums" },
            { key: "buyer", header: "Buyer" },
            { key: "destination", header: "Destination" },
            { key: "pallets", header: "Pallets", className: "tabular-nums" },
            { key: "weight", header: "Weight", className: "tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      }
    />
  ),
});
