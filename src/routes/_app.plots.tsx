import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { plots, plotHectares } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/plots")({
  head: () => ({ meta: [{ title: "Plots — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Plots"
      description="Cultivation plots across your farms"
      data={plots}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "farm", header: "Farm" },
        { key: "variety", header: "Variety" },
        { key: "hectares", header: "Hectares", className: "tabular-nums", render: (r) => `${r.hectares} ha` },
        { key: "aggregated", header: "Valve total (ha)", className: "tabular-nums", render: (r) => `${plotHectares(r.id).toFixed(1)} ha` },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
