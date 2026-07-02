import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { parks, parkHectares } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/parks")({
  head: () => ({ meta: [{ title: "Parks — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Parks"
      description="Park blocks (child of Valve)"
      data={parks}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Park", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "valve", header: "Valve", className: "font-mono text-xs" },
        { key: "ha", header: "Aggregated ha", className: "tabular-nums", render: (r) => `${parkHectares(r.id)} ha` },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
