import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { dispatchNotes } from "@/lib/mock-data";
import { ClarifyBanner } from "@/components/common/ClarifyBanner";

export const Route = createFileRoute("/_app/dispatch-notes")({
  head: () => ({ meta: [{ title: "Dispatch Notes — HCTS" }] }),
  component: () => (
    <>
      <PageHeader title="Dispatch Notes" description="Monitor outbound shipments — created on mobile" />
      <div className="space-y-4 p-6">
        <ClarifyBanner items={["Dispatch Notes are created on the mobile app. Web portal supports view, approve, close and export only."]} />
        <DataTable
          data={dispatchNotes}
          bulkActions={false}
          rowActions={false}
          columns={[
            { key: "id", header: "Note #", className: "font-mono text-xs font-medium" },
            { key: "date", header: "Date", className: "tabular-nums" },
            { key: "buyer", header: "Buyer", render: (r) => <span className="font-medium">{r.buyer}</span> },
            { key: "destination", header: "Destination Center" },
            { key: "pallets", header: "Pallets", className: "tabular-nums" },
            { key: "weight", header: "Est. Weight", className: "tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
    </>
  ),
});
