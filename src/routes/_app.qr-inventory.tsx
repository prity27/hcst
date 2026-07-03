import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { qrInventory, QR_INVENTORY_STATUSES } from "@/lib/mock-data";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/qr-inventory")({
  head: () => ({ meta: [{ title: "QR Inventory — HCTS" }] }),
  component: () => (
    <>
      <PageHeader
        title="QR Inventory"
        description="Every QR-tagged crate across the supply chain (scans originate from mobile)"
      />
      <div className="space-y-4 p-6">
        <ClarifyNote>
          Scanning is a mobile-only workflow. Lifecycle: {QR_INVENTORY_STATUSES.join(" → ")}.
        </ClarifyNote>
        <DataTable
          data={qrInventory}
          columns={[
            { key: "id", header: "QR Code", className: "font-mono text-xs font-medium" },
            { key: "series", header: "Series", className: "font-mono text-xs" },
            { key: "plot", header: "Plot", className: "font-mono text-xs" },
            { key: "worker", header: "Worker" },
            { key: "weight", header: "Weight", className: "tabular-nums" },
            { key: "scannedAt", header: "Scanned at", className: "text-muted-foreground tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
    </>
  ),
});
