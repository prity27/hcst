import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { valves, valveHectares } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/valves")({
  head: () => ({ meta: [{ title: "Valves — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Valves"
      description="Irrigation valve registry"
      data={valves}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "plot", header: "Plot", className: "font-mono text-xs" },
        { key: "type", header: "Type" },
        { key: "flow", header: "Flow rate", className: "tabular-nums" },
        { key: "hectares", header: "Hectares", className: "tabular-nums", render: (r) => `${r.hectares} ha` },
        { key: "aggregated", header: "Park total (ha)", className: "tabular-nums", render: (r) => `${valveHectares(r.id).toFixed(1)} ha` },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
