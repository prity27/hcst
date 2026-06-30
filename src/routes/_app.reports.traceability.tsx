import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/common/ReportShell";
import { StatCard } from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
import { Network, QrCode, ShieldCheck, MapPin } from "lucide-react";
import { qrInventory } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/reports/traceability")({
  head: () => ({ meta: [{ title: "Traceability Reports — HCTS" }] }),
  component: () => (
    <ReportShell
      title="Traceability Report"
      description="End-to-end traceability across the supply chain"
      kpis={
        <>
          <StatCard label="QR Traceable" value="99.7%" delta="+0.2%" icon={<Network className="h-4.5 w-4.5" />} accent="success" />
          <StatCard label="Codes Tracked" value="28,617" delta="+4.8%" icon={<QrCode className="h-4.5 w-4.5" />} accent="primary" />
          <StatCard label="Certified Lots" value="142" icon={<ShieldCheck className="h-4.5 w-4.5" />} accent="info" />
          <StatCard label="Origins Mapped" value="14 farms" icon={<MapPin className="h-4.5 w-4.5" />} accent="earth" />
        </>
      }
      chart={
        <div className="grid gap-4 md:grid-cols-5">
          {["Plot Origin", "Worker Scan", "Park Storage", "Dispatch Loaded", "Buyer Delivered"].map((step, i) => (
            <div key={step} className="relative rounded-lg border border-border bg-muted/30 p-4">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Step {i + 1}</div>
              <div className="mt-1 text-sm font-semibold">{step}</div>
              <div className="mt-3 text-2xl font-semibold tabular-nums text-primary">
                {[28617, 28612, 28590, 28412, 28104][i].toLocaleString()}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                {(((28617 - [28617, 28612, 28590, 28412, 28104][i]) / 28617) * 100).toFixed(2)}% loss
              </div>
            </div>
          ))}
        </div>
      }
      table={
        <DataTable
          data={qrInventory}
          bulkActions={false}
          importExport={false}
          rowActions={false}
          columns={[
            { key: "id", header: "QR Code", className: "font-mono text-xs font-medium" },
            { key: "series", header: "Series", className: "font-mono text-xs" },
            { key: "plot", header: "Plot Origin", className: "font-mono text-xs" },
            { key: "worker", header: "Scanned by" },
            { key: "weight", header: "Weight", className: "tabular-nums" },
            { key: "scannedAt", header: "Last Event", className: "text-muted-foreground tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      }
    />
  ),
});
