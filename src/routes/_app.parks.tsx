import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { parks } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/parks")({
  head: () => ({ meta: [{ title: "Parks — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Parks"
      description="Park blocks — deepest level of the Farm → Plot → Valve → Park hierarchy"
      data={parks}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Park", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "valve", header: "Valve", className: "font-mono text-xs" },
        { key: "farm", header: "Farm" },
        { key: "hectares", header: "Hectares", className: "tabular-nums", render: (r) => `${r.hectares} ha` },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
