import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { dispatchNotes } from "@/lib/mock-data";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/dispatch-notes")({
  head: () => ({ meta: [{ title: "Dispatch Notes — HCTS" }] }),
  component: () => (
    <>
      <PageHeader title="Dispatch Notes" description="Outbound shipment authorizations (created on mobile)" />
      <div className="space-y-4 p-6">
        <ClarifyNote>
          Dispatch Notes originate from Loading Team mobile devices. Web portal supports view, monitor, approval and export only.
        </ClarifyNote>
        <DataTable
          data={dispatchNotes}
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
