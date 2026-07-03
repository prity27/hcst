import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Card } from "@/components/ui/card";
import { qrSeries, QR_SERIES_STATUSES } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Printer, CheckCircle2, Clock } from "lucide-react";
import { StatusChip } from "@/components/common/StatusChip";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/qr-series")({
  head: () => ({ meta: [{ title: "QR Series — HCTS" }] }),
  component: QrSeriesPage,
});

function QrSeriesPage() {
  const pending = qrSeries.filter((s) => s.status === "Sent to Printer" || s.qcResult === "Pending").length;
  const received = qrSeries.filter((s) => s.status === "Received" || s.status === "Active").length;

  return (
    <>
      <PageHeader
        title="QR Series"
        description="Generate QR ranges, track printer orders, and manage lifecycle"
        actions={<AddButton>Generate Series</AddButton>}
      />
      <div className="space-y-4 p-6">
        <ClarifyNote>
          A QR Series cannot transition to <span className="font-medium text-foreground">Active</span> until the
          printer order is <span className="font-medium text-foreground">Received</span> and QC passes.
          Statuses follow the WBS lifecycle: {QR_SERIES_STATUSES.join(" → ")}.
        </ClarifyNote>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard icon={<Printer className="h-4 w-4" />} label="Awaiting Printer" value={pending} tone="warning" />
          <SummaryCard icon={<CheckCircle2 className="h-4 w-4" />} label="Received / Active" value={received} tone="success" />
          <SummaryCard icon={<Clock className="h-4 w-4" />} label="Total Series" value={qrSeries.length} tone="info" />
        </div>

        <DataTable
          data={qrSeries}
          columns={[
            { key: "series", header: "Series", className: "font-mono text-xs font-medium" },
            { key: "rangeFrom", header: "From", className: "font-mono text-xs" },
            { key: "rangeTo", header: "To", className: "font-mono text-xs" },
            { key: "printer", header: "Printer" },
            { key: "sentDate", header: "Sent", className: "tabular-nums" },
            { key: "receivedDate", header: "Received", className: "tabular-nums text-muted-foreground" },
            {
              key: "expectedQty",
              header: "Expected / Received",
              className: "tabular-nums",
              render: (r) => `${r.expectedQty.toLocaleString()} / ${r.receivedQty.toLocaleString()}`,
            },
            {
              key: "qcResult",
              header: "QC",
              render: (r) => <StatusChip status={r.qcResult === "Pass" ? "Approved" : r.qcResult === "Fail" ? "Damaged" : "Sent to Printer"} />,
            },
            { key: "responsible", header: "Responsible" },
            {
              key: "assigned",
              header: "Assigned",
              render: (r) => (
                <div className="flex items-center gap-2">
                  <Progress value={(r.assigned / r.generated) * 100} className="h-1.5 w-20" />
                  <span className="text-xs tabular-nums">{r.assigned}</span>
                </div>
              ),
            },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
    </>
  );
}

function SummaryCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: "warning" | "success" | "info" }) {
  const toneCls =
    tone === "warning" ? "bg-warning/10 text-warning-foreground" :
    tone === "success" ? "bg-success/10 text-success" :
    "bg-info/10 text-info";
  return (
    <Card className="border-border p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneCls}`}>{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold tabular-nums">{value.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
}
