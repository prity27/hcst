import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { transferOrders } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/transfer-orders")({
  head: () => ({ meta: [{ title: "Transfer Orders — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Transfer Orders"
      description="Truck assignments and shipment tracking"
      data={transferOrders}
      addLabel="New Transfer Order"
      columns={[
        { key: "id", header: "Order #", className: "font-mono text-xs font-medium" },
        { key: "truck", header: "Truck", className: "font-mono text-xs" },
        { key: "driver", header: "Driver" },
        { key: "provider", header: "Transport Provider" },
        { key: "dispatchNote", header: "Dispatch Note", className: "font-mono text-xs" },
        { key: "eta", header: "ETA", className: "tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
