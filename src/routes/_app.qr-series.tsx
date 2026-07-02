import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Printer, FileDown } from "lucide-react";
import { qrSeries, printerOrders } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { StatusChip } from "@/components/common/StatusChip";

export const Route = createFileRoute("/_app/qr-series")({
  head: () => ({ meta: [{ title: "QR Series — HCTS" }] }),
  component: QrSeriesPage,
});

function QrSeriesPage() {
  return (
    <>
      <PageHeader
        title="QR Series"
        description="Generate and manage QR code ranges. Scanning is performed on the mobile app."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-3.5 w-3.5" /> Print Labels</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileDown className="h-3.5 w-3.5" /> Download PDF</Button>
            <AddButton>Generate Series</AddButton>
          </>
        }
      />
      <div className="space-y-6 p-6">
        <DataTable
          data={qrSeries}
          columns={[
            { key: "series", header: "Series", className: "font-mono text-xs font-medium" },
            { key: "rangeFrom", header: "From", className: "font-mono text-xs" },
            { key: "rangeTo", header: "To", className: "font-mono text-xs" },
            { key: "generated", header: "Generated", className: "tabular-nums" },
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
            {
              key: "collected",
              header: "Collected",
              render: (r) => (
                <div className="flex items-center gap-2">
                  <Progress value={(r.collected / r.generated) * 100} className="h-1.5 w-20" />
                  <span className="text-xs tabular-nums">{r.collected}</span>
                </div>
              ),
            },
            { key: "status", header: "Status" },
          ]}
        />

        <Card className="border-border p-6 shadow-card gap-4">
          <div>
            <h3 className="text-base font-semibold">Printer Order Tracking</h3>
            <p className="text-xs text-muted-foreground">
              A series can only reach Active status once its printer order is Received and QC passes.
            </p>
          </div>
          <DataTable
            data={printerOrders.map((o) => ({ ...o, status: o.qcResult ?? "Pending" }))}
            bulkActions={false}
            rowActions={false}
            importExport={false}
            columns={[
              { key: "seriesId", header: "Series ID", className: "font-mono text-xs" },
              { key: "printer", header: "Printer" },
              { key: "sentDate", header: "Sent", className: "tabular-nums text-xs" },
              { key: "receivedDate", header: "Received", className: "tabular-nums text-xs", render: (r) => r.receivedDate ?? "—" },
              { key: "expectedQty", header: "Expected", className: "tabular-nums" },
              { key: "receivedQty", header: "Received Qty", className: "tabular-nums" },
              {
                key: "qcResult",
                header: "QC Result",
                render: (r) => r.qcResult ? <StatusChip status={r.qcResult} /> : <span className="text-xs text-muted-foreground">Awaiting</span>,
              },
              { key: "responsible", header: "Responsible" },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
