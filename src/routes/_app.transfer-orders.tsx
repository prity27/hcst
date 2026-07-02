import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { transferOrders } from "@/lib/mock-data";
import { ClarifyBanner } from "@/components/common/ClarifyBanner";

export const Route = createFileRoute("/_app/transfer-orders")({
  head: () => ({ meta: [{ title: "Transfer Orders — HCTS" }] }),
  component: () => (
    <>
      <PageHeader title="Transfer Orders" description="Monitor truck departures — created on mobile" />
      <div className="space-y-4 p-6">
        <ClarifyBanner items={["Transfer Orders are created on the mobile app. Web portal supports view / approve / close / export."]} />
        <DataTable
          data={transferOrders}
          bulkActions={false}
          rowActions={false}
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
      </div>
    </>
  ),
});
