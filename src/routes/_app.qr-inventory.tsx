import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { qrInventory } from "@/lib/mock-data";
import { ClarifyBanner } from "@/components/common/ClarifyBanner";

export const Route = createFileRoute("/_app/qr-inventory")({
  head: () => ({ meta: [{ title: "QR Inventory — HCTS" }] }),
  component: () => (
    <>
      <PageHeader
        title="QR Inventory"
        description="Track every QR-tagged crate across the supply chain"
      />
      <div className="space-y-4 p-6">
        <ClarifyBanner items={["QR scanning is a mobile-only action. This screen is monitor-only."]} />
        <DataTable
          data={qrInventory}
          bulkActions={false}
          rowActions={false}
          columns={[
            { key: "id", header: "QR Code", className: "font-mono text-xs font-medium" },
            { key: "series", header: "Series", className: "font-mono text-xs" },
            { key: "plot", header: "Plot", className: "font-mono text-xs" },
            { key: "worker", header: "Worker" },
            { key: "weight", header: "Weight", className: "tabular-nums" },
            { key: "scannedAt", header: "Last event", className: "text-muted-foreground tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
    </>
  ),
});
