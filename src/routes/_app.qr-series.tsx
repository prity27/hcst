import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Printer, FileDown, Boxes } from "lucide-react";
import { qrSeries } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/qr-series")({
  head: () => ({ meta: [{ title: "QR Series — HCTS" }] }),
  component: () => (
    <>
      <PageHeader
        title="QR Series"
        description="Generate and manage QR code ranges"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-3.5 w-3.5" /> Print Labels</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileDown className="h-3.5 w-3.5" /> Download PDF</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Boxes className="h-3.5 w-3.5" /> View Inventory</Button>
            <AddButton>Generate Series</AddButton>
          </>
        }
      />
      <div className="p-6">
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
      </div>
    </>
  ),
});
