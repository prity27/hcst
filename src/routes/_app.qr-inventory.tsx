import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { qrInventory } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/qr-inventory")({
  head: () => ({ meta: [{ title: "QR Inventory — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="QR Inventory"
      description="Track every QR-tagged crate across the supply chain"
      data={qrInventory}
      addLabel="Scan QR"
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
  ),
});
