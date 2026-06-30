import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { destinationCenters } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/destination-centers")({
  head: () => ({ meta: [{ title: "Destination Centers — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Destination Centers"
      description="Distribution hubs and receiving warehouses"
      data={destinationCenters}
      addLabel="Add Center"
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Center", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "city", header: "City" },
        { key: "capacity", header: "Capacity", className: "tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
