import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { dispatchNotes } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dispatch-notes")({
  head: () => ({ meta: [{ title: "Dispatch Notes — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Dispatch Notes"
      description="Outbound shipment authorizations"
      data={dispatchNotes}
      addLabel="New Dispatch Note"
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
  ),
});
