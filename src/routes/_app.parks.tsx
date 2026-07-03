import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { parks } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/parks")({
  head: () => ({ meta: [{ title: "Parks — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Parks"
      description="Park blocks and capacity"
      data={parks}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Park", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "farm", header: "Farm" },
        { key: "capacity", header: "Capacity (crates)", className: "tabular-nums", render: (r) => r.capacity.toLocaleString() },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
