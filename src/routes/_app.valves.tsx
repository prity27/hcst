import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { valves, valveHectares } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/valves")({
  head: () => ({ meta: [{ title: "Valves — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Valves"
      description="Irrigation valves (child of Plot)"
      data={valves}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "plot", header: "Plot", className: "font-mono text-xs" },
        { key: "type", header: "Type" },
        { key: "ha", header: "Aggregated ha", className: "tabular-nums", render: (r) => `${valveHectares(r.id)} ha` },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
